describe ('Test Modul Category', () => {
    it ('Get single category by id', () => {
        cy.request('GET', '[GET] https://api.escuelajs.co/api/v1/categories/5')
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('Miscellanious');
        })
    })

    it ('Create categoty', () => {
        cy.request({
            method: 'POST',
            url:  'https://api.escuelajs.co/api/v1/categories/',
            body: {
                "name": "New Category",
                "image": "https://placeimg.com/640/480/any"
            }
        })
        
    })
})