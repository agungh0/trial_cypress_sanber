class loginPage{
    visitPage() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }
    waitLogin() {
        cy.contains('Login', { timeout: 50000 }).should('be.visible');
    }
    inputUsername(username) {
        cy.get('[name="username"]').type(username)
    }
    inputPassword(password) {
        cy.get('[name="password"]').type(password)
    }
    clickLogin() {
        cy.get('[type="submit"]').click()
    }
    clickForgotPass() {
        cy.get('.orangehrm-login-forgot > .oxd-text').click()
    }
    waitDashboard() {
        cy.get('.oxd-topbar-header-breadcrumb > .oxd-text', { timeout: 10000 }).should('be.visible').and('contain', 'Dashboard')
    }
    waitInvalidCredent() {
        cy.contains('Invalid credentials', { timeout: 50000 }).should('be.visible')
    }
    waitRequired() {
        cy.contains('Required', { timeout: 50000 }).should('be.visible')
    }
    waitResetPass() {
        cy.contains('Reset Password', { timeout: 50000 }).should('be.visible')
    }
    assertionDashboard() {
        cy.url().should('include','dashboard')
    }
    assertInvalidCredent() {
        cy.get('.oxd-alert').should('contain','Invalid credentials')
    }
    assertRequiredPass() {
        cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should('contain','Required')
    }
    assertRequiredUser() {
        cy.get(':nth-child(2) > .oxd-input-group > .oxd-text').should('contain','Required')
    }
    assertResetPass() {
        cy.get('.oxd-text--h6').should('contain','Reset Password')
    }
}

export default new loginPage