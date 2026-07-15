describe ('Scenario Fungsi Login', () =>{
    it('Login_01-Login dengan username valid & password valid', () =>{
        cy.intercept(
            'GET', '**/web/index.php/api/v2/dashboard/**').as('dashboarData');
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.contains('Login', { timeout: 25000 }).should('be.visible');
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        cy.get('[type="submit"]').click()
        cy.wait('@dashboarData', {timeout: 50000}).its('response.statusCode').should('equal', 200);
        cy.url().should('include', '/dashboard/index');
    })

    it('Login_02-Login dengan username invalid & password valid', () =>{
        cy.intercept('POST', '**/web/index.php/auth/validate').as('loginAuth');
        cy.intercept(
            'POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('actionSummary');
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.contains('Login', { timeout: 50000 }).should('be.visible');
        cy.get('[name="username"]').type('Admin1');
        cy.get('[name="password"]').type('admin123');
        cy.get('[type="submit"]').click();
        cy.wait('@loginAuth').its('response.statusCode').should('be.oneOf', [302]);
        cy.contains('Invalid credentials', { timeout: 50000 }).should('be.visible');
        cy.get('.oxd-alert-content').should('contain','Invalid credentials');
        cy.wait('@actionSummary').its('response.statusCode').should('equal', 302);
    })

    it('Login_03-Login dengan username valid & password invalid', () =>{
        cy.intercept('POST', '**/web/index.php/auth/validate').as('loginAuth');
        cy.intercept('GET', '**/web/index.php/core/i18n/messages').as('actionSummary');
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.contains('Login', { timeout: 25000 }).should('be.visible');
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin12345');        
        cy.get('[type="submit"]').click();
        cy.wait('@loginAuth').its('response.statusCode').should('be.oneOf', [302]);
        cy.contains('Invalid credentials', { timeout: 50000 }).should('be.visible');
        cy.get('.oxd-alert-content', {timepout: 20000}).should('contain','Invalid credentials');
        cy.wait('@actionSummary', {timeout: 15000}).its('response.statusCode').should('be.oneOf', [200, 304]);
    })

    it('Login_04-Login dengan username invalid & password invalid', () =>{
        cy.intercept(
            'POST', '**/web/index.php/auth/validate').as('actionSummary');
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.contains('Login', { timeout: 50000 }).should('be.visible');
        cy.get('[name="username"]').type('Admin1');
        cy.get('[name="password"]').type('admin12345');
        cy.get('[type="submit"]').click();
        cy.contains('Invalid credentials', { timeout: 50000 }).should('be.visible');
        cy.wait('@actionSummary', { timeout: 20000 }).its('response.statusCode').should('be.oneOf', [200, 302]);
        cy.get('.oxd-alert-content', {timeout: 20000}).should('contain','Invalid credentials');
    })

    it('Login_05-Login dengan username valid tanpa input password', () =>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.contains('Login', { timeout: 50000 }).should('be.visible');
        cy.get('[name="username"]').type('Admin');
        cy.intercept('POST', '/web/index.php/auth/login').as('loginRequest');
        cy.get('[type="submit"]').click();
        cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should('contain','Required');
        cy.get('@loginRequest.all').should('have.length', 0);
        // cy.get('@loginRequest').should('be.null');
    })

    it('Login_06-Login dengan password valid tanpa input username', () =>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.contains('Login', { timeout: 50000 }).should('be.visible');
        cy.get('[name="password"]').type('admin123');
        cy.intercept('POST', /\/auth\/validate/).as('regexApi');
        cy.get('[type="submit"]').click();
        cy.get(':nth-child(2) > .oxd-input-group > .oxd-text').should('contain','Required');
        cy.get('@regexApi.all').should('have.length', 0);
    })

    it('Login_07-Login dengan tanpa input username & tanpa input password', () =>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.contains('Login', { timeout: 50000 }).should('be.visible');
        cy.intercept('POST', '*').as('globalPostCapture');
        cy.get('[type="submit"]').click();
        cy.get(':nth-child(2) > .oxd-input-group > .oxd-text').should('contain','Required');
        cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should('contain','Required');
        cy.get('@globalPostCapture.all').should('have.length', 0);
    })

    it('Login_08-Akses halaman forgot password dari halaman login', () =>{
        cy.intercept(
            'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode').as('actionSummary');
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.contains('Login', { timeout: 50000 }).should('be.visible');
        cy.get('.orangehrm-login-forgot > .oxd-text').click();
        cy.contains('Reset Password', { timeout: 50000 }).should('be.visible');
        cy.get('.oxd-text--h6').should('contain','Reset Password');
        cy.wait('@actionSummary', {timeout: 15000}).its('response.statusCode').should('eq', 200);
    })
})