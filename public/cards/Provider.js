var ProviderCard = function(data){
    this.card = div().addClass('provider animated fadeIn').css('padding-bottom','25px').css(Styles.click()).hover(
        function(){$(this).animate({'background-color':transparentBlack(),'color':'white'},300);},
        function(){$(this).animate({'background-color':transparent(),'color':'black'},300)}
    ).click(function(){
        $(this).unbind("mouseenter mouseleave");
        $(this).attr('data-info',JSON.stringify(data));
        $(this).css('background-color',transparentBlack()).addClass('selected')
        var selected = $('.selected').length;
        $('.selectCount').replaceWith(
            col(6).append( text(selected+' Selected','black','22px').css('line-height','50px') ).addClass('selectCount')
        );
    });
    this.dataRow = row();
    this.side1 = col(6).removeClass('text-center').addClass('text-left');
    this.fullName = text((data['last_name']+', '+data['first_name']),'black','22px');
    this.email = text(data['email_address'],'white','18px');
    this.side2 = col(6).removeClass('text-center').addClass('text-right');
    this.specialty = text(data['specialty'],'black','18px');
    this.practice = text(data['practice_name'],'black','18px');
    this.card.attr('data-info',JSON.stringify(data));

    return this.card.append(
        this.dataRow.append(
            this.side1.append( this.fullName, this.email),
            this.side2.append( this.specialty, this.practice)
        )
    )
}
