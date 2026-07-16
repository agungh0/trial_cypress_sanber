describe ('Test Modul Category', () => {
    it ('Create user success', () => {
        cy.request({
            method: 'POST',
            url:  'https://api.escuelajs.co/api/v1/users/',
            body: {
                "name": "Nicolas Cage25",
                "email": "nico25@gmail.com",
                "password": "12345",
                "avatar": "https://picsum.photos/800"
        }
    })
            .then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body.id).to.not.be.null;
                expect(response.duration).to.be.within(50, 5000);
                expect(response.body.name).to.include("Nicolas Cage");
            });
        });

    it ('Create user failed', () => {
        cy.request({
            method: 'POST',
            url:  'https://api.escuelajs.co/api/v1/users/',
            failOnStatusCode: false,
            body: {
                    "name": "Nicolas Cage26",
                     "email": "nico@gmail.com",
                    "password": "1234",
                }
    })
            .then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body.id).to.be.undefined;
                expect(response.duration).to.be.within(50, 5000);
                expect(response.body.message).to.include("avatar should not be empty");
                });
        });

    it('Get single user by id', () => {
        cy.request('GET', 'https://api.escuelajs.co/api/v1/users/1')
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.id).to.not.be.undefined;
                expect(response.duration).to.be.within(50, 5000);
        });
    });

    it ('Get multiple user', () => {
        cy.request('GET', 'https://api.escuelajs.co/api/v1/users/')
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.not.be.undefined;
                expect(response.duration).to.be.within(50, 5000);
            });
    });

    it ('Login success', () => {
        cy.request({
            method: 'POST',
            url:  'https://api.escuelajs.co/api/v1/auth/login',
            body: {
                    "email": "nico25@gmail.com",
                    "password": "12345"
                }
        })
            .then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body.access_token).to.not.be.undefined;
                expect(response.duration).to.be.within(50, 5000);
            });
        });

    it ('Login failed', () => {
        cy.request({
            method: 'POST',
            url:  'https://api.escuelajs.co/api/v1/auth/login',
            failOnStatusCode: false,
            body: {
                    "email": "nico25@gmail.com",
                    "password": "123456"
                }
        })
            .then((response) => {
                expect(response.status).to.eq(401);
                expect(response.duration).to.be.within(50, 5000);
            });
        });

    it ('Create category success', () => {
        cy.request({
            method: 'POST',
            url:  'https://api.escuelajs.co/api/v1/categories',
            body: {
                "name": "New Category27",
                "image": "https://placeimg.com/640/480/any"
            }
        })
            .then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body.name).to.include('New Category');
            });
        });

    it ('Create category failed', () => {
        cy.request({
            method: 'POST',
            url:  'https://api.escuelajs.co/api/v1/categories',
            failOnStatusCode: false,
            body: {
                "name": "New Category",
                "image": "https://placeimg.com/640/480/any"
            }
        })
            .then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body.message).to.include("SqliteError: UNIQUE constraint failed: category.slug");
            });
        });
    
    it ('Get single category by id', () => {
        cy.request('GET', 'https://api.escuelajs.co/api/v1/categories/96')
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.id).to.eq(96);
                expect(response.duration).to.be.within(50, 5000);
            });
    });

    it ('Get multiple category', () => {
        cy.request('GET', 'https://api.escuelajs.co/api/v1/categories/')
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array');
                expect(response.duration).to.be.within(50, 5000);
            });
    });

    it ('Update Category', () => {
        cy.request({
            method: 'PUT',
            url:  'https://api.escuelajs.co/api/v1/categories/111',
            body: {
                "name": "Updated Category Name25",
                "image": "https://placeimg.com/640/480/any"
            }
        })
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.duration).to.be.within(50, 5000);
            });
        });

    it ('Delete category', () => {
        cy.request('DELETE', 'https://api.escuelajs.co/api/v1/categories/116')
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.duration).to.be.within(50, 5000);
            });
    });
});