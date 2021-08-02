var data = JSON.parse(localStorage.getItem("USER"))

if (data == null) {
    alert("Vui lòng đăng nhập trước")
    window.location = './signin.html'
}

var name = "@" + data.user;
var phoneNameElement = document.querySelector('.phone__user')
var userNameElement = document.querySelector('.sub-user__tree-name')

phoneNameElement.innerHTML = name;
userNameElement.innerHTML = name;

var sharebtnElement = document.querySelector('.nav-right__share-btn')

var check = true
sharebtnElement.onclick = function() {
    var listElement = document.querySelector('.nav-right__share-list')
    if (check) {
        listElement.style.display = 'block'
        check = false
    } else {
        listElement.style.display = 'none'
        check = true
    }
}

function editText(editElement, nameclass, url) {
    var element = editElement.parentElement.parentElement.parentElement.lastElementChild
    var inputElement = editElement.nextElementSibling
    editElement.style.display = "none"
    inputElement.style.display = "block"
    inputElement.focus()
    inputElement.onblur = function(e) {
        var value = inputElement.value.trim().length
        if (value > 0) {
            if (url) {
                var isurl = validURL(inputElement.value)
                var parentElement = editElement.parentElement
                var errorElement = document.querySelector('.message__error')
                if (isurl) {
                    onOff(element, inputElement, nameclass)
                } else {
                    parentElement.classList.add('invalidURL')
                    errorElement.style.display = 'inline-block'
                }
                inputElement.oninput = function(e) {
                    parentElement.classList.remove('invalidURL')
                    errorElement.style.display = 'none'
                }
            }
        } else {
            editElement.style.display = "block"
            inputElement.style.display = "none"
        }
    }

}


function onOff(element, urlElement, nameclass) {
    var parentElementUrl = urlElement.parentElement
    var parentElementName = parentElementUrl.previousElementSibling
    var nameElement = parentElementName.querySelector('.content-info__top-input')
    var btnSuccess = document.querySelector('.item-link__button')

    if (urlElement && nameElement) {
        if (urlElement.value.trim().length > 0 && nameElement.value.trim().length > 0) {
            console.log("thêm")
            btnSuccess.classList.add('item-link__button--success')
            addItemPhone(element, urlElement.value.trim(), nameElement.value.trim(), nameclass)
        }
    }
}

function btnOn(element, nameclass) {
    console.log(nameclass)
    var parentElement = element.parentElement;
    var childElement = parentElement.firstElementChild;
    var firstElementChild = childElement.firstElementChild;
    var lastElementChild = childElement.lastElementChild;
    var inputNameElement = firstElementChild.querySelector('.content-info__input');
    var inputUrlElement = lastElementChild.querySelector('.content-info__input');
    // var btnSuccess = document.querySelector('.item-link__button')
    var error = parentElement.querySelector('.message__error').offsetHeight > 0 ? true : false;

    if (inputNameElement && inputUrlElement) {
        if (inputNameElement.value.trim().length > 0 && inputUrlElement.value.trim().length > 0 && error === false) {
            element.classList.toggle('item-link__button--success')
            addItemPhone(element, inputUrlElement.value.trim(), inputNameElement.value.trim(), nameclass)
        }
    }

}

function addItemPhone(element, url, title, nameclass) {
    console.log(nameclass)

    // var btnSuccess = document.querySelector('.item-link__button')
    var sattus
    if (element) {
        sattus = element.matches('.item-link__button--success')
    }
    var load = document.querySelector('.phone__load')
    load.style.display = 'block'
    setTimeout(function() {
        load.style.display = 'none'

        if (sattus) {
            $('.phone').append(`
                <a class="phone__item ${nameclass}" href="${url}">
                    <span class="phone__item-name">${title}</span>
                </a>
            `)
        } else {
            var item = document.querySelector('.' + nameclass)
            item.remove()
        }
    }, 1000)
}


function validURL(str) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    return regex.test(str)
}

function deleteItem(element) {
    element.classList.toggle('icon--click')
    var deleteElement = element.offsetParent.offsetParent.querySelector('.delete')
    deleteElement.classList.toggle('delete--display')
}

function closeDelete(element) {
    var parentElement = element.parentElement.parentElement
    console.log(parentElement)
    element.offsetParent.offsetParent.querySelector('.fa-trash-alt').classList.toggle('icon--click')
    parentElement.classList.toggle('delete--display')
}

function deleted(element, nameclass) {
    var parentElement = element.offsetParent
    parentElement.remove()
    var load = document.querySelector('.phone__load')
    load.style.display = 'block'
    setTimeout(function() {
        load.style.display = 'none'

        var itemphone = document.querySelector('.phone .' + nameclass)
        if (itemphone) {
            itemphone.remove()
        }
    }, 1000)
}

var addBtnElement = document.querySelector('.create-link__btn')

addBtnElement.onclick = function() {
    var time = new Date
    var name = "name" + time.getMilliseconds()
    $('.list__add').prepend(`
    <div class="item-link item-link-${name}">
    <div class="item__content">
        <div class="item-link__left">
            <i class="fas fa-ellipsis-v"></i>
        </div>
        <div class="content">
            <div class="content-info">
                <div class="content-info__top">
                    <span class="content-info__title" onclick = "editText(this, '${name}')">Title <i class="fas fa-pen content-info__icon"></i></span>
                    <input class="content-info__input content-info__top-input" type="text">
                </div>
                <div class="content-info__bottom ">
                    <span class="content-info__url" onclick = "editText(this, '${name}', 'url')">Url <i class="fas fa-pen content-info__icon"></i></span>
                    <input class="content-info__input content-info__bottom-input" type="text">
                </div>
            </div>
            <div class="message__error">Unsafe URL</div>
            <div class="content-list">
                <i class="far fa-image content-list__icon"></i>
                <i class="far fa-chart-bar content-list__icon"></i>
                <i class="fas fa-trash-alt content-list__icon" onclick="deleteItem(this)"></i>
            </div>
            <div class="item-link__button" onclick = "btnOn(this, '${name}')">
                <div class="item-link__button-circle"></div>
            </div>
        </div>
    </div>
    <div class="delete">
        <div class="delete__title">Delete <i class="fas fa-times delete__icon" onclick="closeDelete(this)"></i></div>
        <span class="delete__des">Delete this forever?</span>
        <div class="delete__btn">
            <div class="delete__btn-cancel delete-btn" onclick="closeDelete(this)">Cancel</div>
            <div class="delete__btn-delete delete-btn" onclick="deleted(this, '${name}')">Delete</div>
        </div>
    </div>
</div>
    `)
}