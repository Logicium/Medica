var ViewProviders = function(data){

    this.providersContainer = div();
    this.toolBar = row();
    this.name = text('Provider List:','black','22px').css('margin-bottom','20px')
    this.contentRow = div().addClass('contentRow').css('margin-top','20px').css('margin-bottom','20px').css('max-height','400px').css('overflow-y','scroll');
    this.selectionRow = row();
    this.selected = col(6).append( text('0 Selected','black','22px').css('line-height','50px') ).addClass('selectCount');

    this.clear = buttonCol('Clear',3).addClass('rev').removeClass('ghost').click(function(){
        $('.selected').css('background',transparent()).removeClass('selected').hover(
            function(){$(this).animate({'background-color':transparentBlack(),'color':'white'},300);},
            function(){$(this).animate({'background-color':transparent(),'color':'black'},300)}
        );
        $('.selectCount').replaceWith(
            col(6).append( text('0 Selected','black','22px').css('line-height','50px') ).addClass('selectCount')
        );
    });

    this.remove = buttonCol('Remove',3).click(function(){
        var arr = JSON.parse(localStorage.getItem('data'));
        var toRemove = $('.selected');
        $.each(toRemove,function(){
            var removeData = JSON.parse($(this).attr('data-info'));
            arr = _.without(
                arr, _.find(arr, removeData)
            );
            $(this).remove();
        });
        $('.selectCount').replaceWith(
            col(6).append( text('0 Selected','black','22px').css('line-height','50px') ).addClass('selectCount')
        );
        localStorage.setItem('data',JSON.stringify(arr));
    });

    this.search = col(6).addClass('search').append( input('Search','text').height('50px').css('margin','0 auto').addClass('rev').removeClass('ghost') );
    var searchResults = [];
    var searchForMatches = function searchForMatches(){

        $('.provider').show();
        var searchKey = $('.search').find('input').val().toLowerCase();
        var providerCards = $('.provider');
        console.log(searchKey);

        if(searchKey.length > 0) {

            for (var i = 0; i < providerCards.length; i++) {
                console.log($(providerCards[i]).attr('data-info'));
                var cardData = JSON.parse($(providerCards[i]).attr('data-info'));
                if(
                    (String(cardData["last_name"]).toLowerCase().indexOf(searchKey) >= 0 ) ||
                    (String(cardData["first_name"]).toLowerCase().indexOf(searchKey) >= 0) ||
                    (String(cardData["email_address"]).toLowerCase().indexOf(searchKey) >= 0) ||
                    (String(cardData["specialty"]).toLowerCase().indexOf(searchKey) >= 0) ||
                    (String(cardData["practice_name"]).toLowerCase().indexOf(searchKey) >= 0)
                ){ console.log('Adding search Result: ',cardData); }
                else {
                    console.log('Not Matched: ',cardData);
                    $(providerCards[i]).hide();
                }
            }
        }
    };

    $('body').on('keyup', '.search', searchForMatches);

    this.sort = col(3).append( select('Sort By',['last_name','first_name','email_address','specialty','practice_name']).on('change', function() {
        var key = this.value
        data = _.sortBy(data,function (text) { return text[key].toLowerCase(); })
        if($('.descending').length>0){data = data.reverse()}
        $('.contentRow').empty();
        for(var i in data ){
            $('.contentRow').append(new ProviderCard(data[i]));
        }
    }).css('background-color',transparentBlack()).css('color','white') );
    this.direction = new AscendingButton(data);

    this.providersContainer.append(
        this.name,
        this.toolBar.append(
            this.search,this.sort,this.direction
        ),
        this.contentRow,
        this.selectionRow.append( this.clear, this.selected, this.remove)
    );

    for(var i in data ){
        this.contentRow.append(new ProviderCard(data[i]));
    }

    return this.providersContainer;
}

var AscendingButton = function(data){
    $('.contentRow').empty();
    for(var i in data ){
        $('.contentRow').append(new ProviderCard(data[i]));
    }
    return buttonCol('Ascending',3).click(function(){
        $(this).replaceWith( new DescendingButton(data))
    });
}

var DescendingButton = function(data){
    var rev = data.reverse();
    $('.contentRow').empty();
    for(var i in rev ){
        $('.contentRow').append(new ProviderCard(rev[i]));
    }
    return buttonCol('Descending',3).addClass('descending').click(function(){
        $(this).replaceWith( new AscendingButton(data.reverse()))
    });
}
