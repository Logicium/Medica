var AddProvider = function(){

    this.addProviderCard = div();
    this.title = text('Add Provider:','black','20px').css('margin-bottom','20px'),
    this.inputs = list([
        input('Last Name','text').height('70px').prop('required',true),
        input('First Name','text').height('70px').prop('required',true),
        input('Email Address','email').height('70px').prop('required',true),
        input('Specialty','text').height('70px'),
        input('Practice Name','text').height('70px')
    ]).css('margin-top','85px');

    this.submit = button('Submit').height('50px').css('margin-top','28px').addClass('rev').removeClass('ghost').click(function(){
        var inputs = $('input').not('.search');
        console.log(inputs);
        var vals = [];
        var complete = true;
        $.each(inputs,function(){
            if ( $(this).prop('required') && $(this).val() === '' ){
                $(this).css('border','2px solid #f99');
                complete = false;
                swal({title:'Missing field',text:'One or more fields are required are not filled out',type:'error'});
            };
        });
        $.each(inputs,function(){
            if( complete==true ){ $(this).css('border','1px solid white'); vals.push($(this).val()); $(this).val('') };
        });

        if(complete == true){
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

            $('.ascending').replaceWith( new AscendingButton(currentData) );
            $('.descending').replaceWith( new DescendingButton(currentData) );
            localStorage.setItem('data',JSON.stringify(currentData));
        }
    });

    return this.addProviderCard.append(
        this.title,
        this.inputs,
        this.submit
    )
}
