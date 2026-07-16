import loginPage from "../../support/loginPage"
import loginData from "../../fixtures/loginData.json"

describe ('Scenario Fungsi Login', () =>{
    it('Login_01-Login dengan username valid & password valid', () =>{
        loginPage.visitPage();
        loginPage.inputUsername(loginData.usernameValid);
        loginPage.inputPassword(loginData.passwordValid);
        loginPage.clickLogin();
        loginPage.waitDashboard();
        loginPage.assertionDashboard();
    })

    it('Login_02-Login dengan username invalid & password valid', () =>{
        loginPage.visitPage();
        loginPage.waitLogin();
        loginPage.inputUsername(loginData.usernameInvalid);
        loginPage.inputPassword(loginData.passwordValid);
        loginPage.clickLogin();
        loginPage.waitInvalidCredent();
        loginPage.assertInvalidCredent();
    })

    it('Login_03-Login dengan username valid & password invalid', () =>{
        loginPage.visitPage();
        loginPage.waitLogin();
        loginPage.inputUsername(loginData.usernameValid);
        loginPage.inputPassword(loginData.passwordInvalid);
        loginPage.clickLogin();
        loginPage.waitInvalidCredent();
        loginPage.assertInvalidCredent();
    })

    it('Login_04-Login dengan username invalid & password invalid', () =>{
        loginPage.visitPage();
        loginPage.waitLogin();
        loginPage.inputUsername(loginData.usernameInvalid);
        loginPage.inputPassword(loginData.passwordInvalid);
        loginPage.clickLogin();
        loginPage.waitInvalidCredent();
        loginPage.assertInvalidCredent();
    })

    it('Login_05-Login dengan username valid tanpa input password', () =>{
        loginPage.visitPage();
        loginPage.waitLogin
        loginPage.inputUsername(loginData.usernameValid);
        loginPage.clickLogin();
        loginPage.waitRequired();
        loginPage.assertRequiredPass();
    })

    it('Login_06-Login dengan password valid tanpa input username', () =>{
        loginPage.visitPage();
        loginPage.waitLogin();
        loginPage.inputPassword(loginData.passwordValid);
        loginPage.clickLogin();
        loginPage.waitRequired();
        loginPage.assertRequiredUser();
    })

    it('Login_07-Login dengan tanpa input username & tanpa input password', () =>{
        loginPage.visitPage();
        loginPage.waitLogin();
        loginPage.clickLogin();
        loginPage.waitRequired();
        loginPage.assertRequiredUser();
        loginPage.assertRequiredPass();
    })

    it('Login_08-Akses halaman forgot password dari halaman login', () =>{
        loginPage.visitPage();
        loginPage.waitLogin();
        loginPage.clickForgotPass();
        loginPage.waitResetPass();
        loginPage.assertResetPass();
    })
})