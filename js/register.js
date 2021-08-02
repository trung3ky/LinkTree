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
            parentElement.classList.remove('valid')
            errorElement.innerHTML = error
            options.isValid()
        } else {
            parentElement.classList.remove('invalid')
            parentElement.classList.add('valid')
            errorElement.innerHTML = ""
            options.isValid()
        }

        return !error

    }


    var check = document.querySelector('.myCheck')
    check.onclick = function() {
        if (check.checked) {
            options.isValid()
        } else {
            options.isValid()
        }
    }


    const formElement = document.querySelector(options.form)

    // var formElement = document.querySelector('.submit-btn')
    // console.log(btn)
    formElement.onsubmit = function(e) {
        var email = document.querySelector('.email--input').value
        var user = document.querySelector('.username--input').value
        var password = document.querySelector('.password--input').value
        localStorage.setItem("USER", JSON.stringify({ email: email, user: user, password: password }))
        formElement.action = "index.html"
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

Validator.isEmail = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(value).toLowerCase()) ? undefined : message || "Trường này phải là email"

        }
    }
}

Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined : message || "Vui lòng nhập trường này"
        }
    }
}
Validator.isPassword = function(selector, length, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim().length >= length ? undefined : message || "Vui lòng nhập tối thiểu " + length + " ký tự"
        }
    }
}


Validator({
    form: '.form-register',
    errorSelector: '.message',
    rules: [
        Validator.isRequired('.email--input'),
        Validator.isEmail('.email--input'),
        Validator.isRequired('.username--input'),
        Validator.isRequired('.password--input'),
        Validator.isPassword('.password--input', 6)
    ],
    isValid: function(data) {
        var email = document.querySelector('.email--input')
        var user = document.querySelector('.username--input')
        var password = document.querySelector('.password--input')
        var emailParent = email.parentElement.matches('.invalid')
        var userParent = user.parentElement.matches('.invalid')
        var passwordParent = password.parentElement.matches('.invalid')

        var check = document.querySelector('.myCheck').checked

        btn = document.querySelector('#check-btn')
        if (email.value.length > 0 && user.value.length > 0 && password.value.length > 5 &&
            check === true && !emailParent && !userParent && !passwordParent) {
            btn.disabled = false
        } else {
            btn.disabled = true
        }

    }
})