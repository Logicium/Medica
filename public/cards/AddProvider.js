var AddProvider = function(){

    this.addProviderCard = div();
    this.title = text('Add Provider:','black','20px').css('margin-bottom','20px'),
    this.inputs = list([
        input('Last Name','text').height('70px'),
        input('First Name','text').height('70px'),
        input('Email Address','email').height('70px'),
        input('Specialty','text').height('70px'),
        input('Practice Name','text').height('70px')
    ]).css('margin-top','85px');

    this.submit = button('Submit').height('50px').css('margin-top','28px').addClass('rev').removeClass('ghost').click(function(){
        var inputs = $('input');
        console.log(inputs);
        var vals = [];

        $.each(inputs,function(){
            console.log(vals.push($(this).val()));
        });
        var newData = {
            last_name:vals[0],
            first_name:vals[1],
            email_address:vals[2],
            specialty:vals[3],
            practice_name:vals[4]
        }

        $('.contentRow').append(new ProviderCard(newData));
        var currentData = JSON.parse(localStorage.getItem('data'));
        currentData.push(newData);
        localStorage.setItem('data',JSON.stringify(currentData));
    });

    return this.addProviderCard.append(
        this.title,
        this.inputs,
        this.submit
    )
}
