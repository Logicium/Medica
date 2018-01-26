var Home = function(data){
    var homeImage = 'public/images/bg1.jpg';
    this.backgroundImage = div().addClass('backgroundImage');
    this.backgroundImage.css(Styles.backgroundImageFull(homeImage));
    this.homePage = div();
    this.titleRow = row();
    this.title = title('Provider Directory | v2.0').addClass('text-center').css('padding','50px');
    this.contentRow = row();
    this.addProviderCol = col(3);
    this.viewProvidersCol = col(9);

    $('body').append(this.homePage.append(
        this.backgroundImage,
        this.title,
        this.contentRow.append(
            this.addProviderCol.append(new AddProvider()),
            this.viewProvidersCol.append(new ViewProviders(data))
        )
    ))
};
