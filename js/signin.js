var USER = "USER"

function Validator(options) {


    const selectorRules = {}

    function validate(inputElement, rule) {
        const parentElement = inputElement.parentElement
        const errorElement = parentElement.querySelector(options.errorSelector)
        const value = inputElement.value
        var error
        var rules = selectorRules[rule.selector]
        for (var i = 0; i < rules.length; i++) {
            error = rules[i](value)
            if (error) break;
        }

        if (error) {
            parentElement.classList.add('invalid')
            errorElement.innerHTML = error
            options.isValid()
        } else {
            parentElement.classList.remove('invalid')
            errorElement.innerHTML = ""
            options.isValid()
        }

        return !error

    }



    const formElement = document.querySelector(options.form)

    formElement.onsubmit = function(e) {
        // e.preventDefault()
        var user = document.querySelector('.username--input').value
        var password = document.querySelector('.password--input').value
            // localStorage.setItem("USER", JSON.stringify({ email: email, user: user, password: password }))
            // formElement.action = "index.html"
        var data = JSON.parse(localStorage.getItem("USER"))
        if (data != null) {
            if (user === data.user && password === data.password) {
                console.log("tài khoản và mật khẩu chính xác")
                formElement.setAttribute("action", "index.html")
            } else {
                console.log("k OK")
                alert("sai tài khoản mật khẩu")
            }
        } else {
            alert("tài khoản không tồn tại, có thể bạn chưa đăng ký tài khoản")
        }
    }

    options.rules.forEach(function(rule) {

        if (Array.isArray(selectorRules[rule.selector])) {
            selectorRules[rule.selector].push(rule.test)
        } else {
            selectorRules[rule.selector] = [rule.test]
        }


        const inputElement = formElement.querySelector(rule.selector)
        inputElement.onblur = function() {
            validate(inputElement, rule)
        }

        inputElement.oninput = function() {
            inputElement.parentElement.classList.remove('invalid')
            inputElement.parentElement.querySelector(options.errorSelector).innerHTML = ""
        }



    })


}


Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined : message || "Vui lòng nhập trường này"
        }
    }
}


Validator({
    form: '.form-sigin',
    errorSelector: '.message',
    rules: [
        Validator.isRequired('.username--input'),
        Validator.isRequired('.password--input')
    ],
    isValid: function(data) {
        var user = document.querySelector('.username--input')
        var password = document.querySelector('.password--input')
        var userParent = user.parentElement.matches('.invalid')
        var passwordParent = password.parentElement.matches('.invalid')
        btn = document.querySelector('.submit-btn')
        if (user.value.length > 0 && password.value.length > 0 &&
            !userParent && !passwordParent) {
            btn.disabled = false
        } else {
            btn.disabled = true
        }

    }
})