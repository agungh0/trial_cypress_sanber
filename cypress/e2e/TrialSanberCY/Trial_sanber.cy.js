describe ('Scenario Fungsi Login', () =>{
    it('Login_01-Login dengan username valid & password valid', () =>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('[name="username"]').type('Admin')
        cy.get('[name="password"]').type('admin123')
        cy.get('[type="submit"]').click()
        cy.url().should('include','dashboard')
    })

    it('Login_02-Login dengan username invalid & password valid', () =>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('[name="username"]').type('Admin1')
        cy.get('[name="password"]').type('admin123')
        cy.get('[type="submit"]').click()
        cy.get('.oxd-alert').should('contain','Invalid credentials')
    })

    it('Login_03-Login dengan username valid & password invalid', () =>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('[name="username"]').type('Admin')
        cy.get('[name="password"]').type('admin12345')
        cy.get('[type="submit"]').click()
        cy.get('.oxd-alert').should('contain','Invalid credentials')
    })

    it('Login_04-Login dengan username invalid & password invalid', () =>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('[name="username"]').type('Admin1')
        cy.get('[name="password"]').type('admin12345')
        cy.get('[type="submit"]').click()
        cy.get('.oxd-alert').should('contain','Invalid credentials')
    })

    it('Login_05-Login dengan username valid tanpa input password', () =>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('[name="username"]').type('Admin')
        cy.get('[type="submit"]').click()
        cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should('contain','Required')
    })

    it('Login_06-Login dengan password valid tanpa input username', () =>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('[name="password"]').type('admin123')
        cy.get('[type="submit"]').click()
        cy.get(':nth-child(2) > .oxd-input-group > .oxd-text').should('contain','Required')
    })

    it('Login_07-Login dengan tanpa input username & tanpa input password', () =>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('[type="submit"]').click()
        cy.get(':nth-child(2) > .oxd-input-group > .oxd-text').should('contain','Required')
        cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should('contain','Required')
    })

    it('Login_08-Akses halaman forgot password dari halaman login', () =>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('.orangehrm-login-forgot > .oxd-text').click()
        cy.get('.oxd-text--h6').should('contain','Reset Password')
    })

    it('Login_09-Akses halaman linkedIn dari halaman login', () =>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('a[href*="linkedin.com/company/orangehrm"]').click()
        cy.url().should('include', 'orangehrm');
    })

    it('Login_10-Akses halaman facebook dari halaman login', () =>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('a[href*="https://www.facebook.com/OrangeHRM/"]').click()
        cy.url().should('include', 'orangehrm');
    })

    it('Login_11-Akses halaman twitter dari halaman login', () =>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('a[href*="https://twitter.com/orangehrm?lang=en"]').click()
        cy.url().should('include', 'orangehrm');
    })

    it('Login_12-Akses halaman Facebook dari halaman login', () =>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('a[href*="https://www.youtube.com/c/OrangeHRMInc"]').click()
        cy.url().should('include', 'orangehrm');
    })
})