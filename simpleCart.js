function formatNumber(t) {
    for (var t = t.toFixed(2) + "", e = t.split("."), i = e[0], n =
        /(\d+)(\d{3})/; n.test(i);) i = i.replace(n, "$1,$2");
    return i
}

function cart(t, e) {
    this.totalItems = 0, this.totalPrice = 0, this.totalWeight = 0, this.items =
        new Array, this.userEmail = t, this.ItemColumns = ["Image", "Name",
            "Price", "Quantity", "Weight", "Total", "Remove", "Options"
        ], this.initialize = function() {
            if (readCookie("simpleCart"))
                for (data = readCookie("simpleCart").split("&"), this.totalItems =
                    1 * data[0], this.totalPrice = 1 * data[1], this.totalWeight =
                    1 * data[2], x = 3; x < data.length; x++) {
                    for (newItem = new item, itemData = data[x].split(","),
                        i = 0, i = 0; i < itemData.length; i++) pair =
                        itemData[i].split("="), newItem.addValue(pair[0],
                            pair[1], pair[2]);
                    if (!(newItem.getValue("name") && newItem.getValue(
                            "price") && newItem.getValue("weight") &&
                        newItem.getValue("quantity"))) return alert(
                        "item must have price, name, and quantity!"
                    ), !1;
                    this.items[x - 3] = newItem
                } else this.totalItems = 0, this.totalPrice = 0, this.totalWeight =
                    0;
            this.setUpEvents(), this.updateCookie(), this.updatePageElements()
        }, this.checkOutEvent = function() {
            return simpleCart.checkOut(), !1
        }, this.emptyEvent = function() {
            return simpleCart.empty(), !1
        }, this.setUpEvents = function() {
            var t, e = 0,
                i = getElementsByClassName("simpleCart_total");
            for (e = 0, i = getElementsByClassName("simpleCart_checkout"),
                e = 0; e < i.length; e++) t = i[e], t.addEventListener ? t.addEventListener(
                "click", this.checkOutEvent, !1) : t.attachEvent && t.attachEvent(
                "onclick", this.checkOutEvent);
            for (e = 0, i = getElementsByClassName("simpleCart_empty"), e =
                0; e < i.length; e++) t = i[e], t.addEventListener ? t.addEventListener(
                "click", this.emptyEvent, !1) : t.attachEvent && t.attachEvent(
                "onclick", this.emptyEvent)
        }, this.add = function() {
            newItem = new item;
            var t = 0;
            for (t = 0; t < arguments.length; t++) temp = arguments[t],
                data = temp.split("="), newItem.addValue(data[0], data[1]);
            if (!newItem.getValue("name") || !newItem.getValue("price") ||
                !newItem.getValue("weight")) return alert(
                "Item must have name, weight and price to be added to the cart!"
            ), !1;
            for (showNotif(), isnew = !0, newItem.getValue("quantity") ||
                newItem.addValue("quantity", 1), this.totalItems = this.totalItems +
                newItem.getValue("quantity"), t = 0, t = 0; t < this.items.length; t++
            ) tempItem = this.items[t], tempItem.equalTo(newItem) && (
                tempItem.addValue("quantity", parseInt(tempItem.getValue(
                    "quantity")) + parseInt(newItem.getValue(
                    "quantity"))), this.totalPrice = this.totalPrice +
                parseFloat(tempItem.getValue("price")), this.totalWeight =
                this.totalWeight + parseFloat(tempItem.getValue(
                    "weight")), isnew = !1);
            isnew && (this.items[this.items.length] = newItem, this.totalPrice =
                    this.totalPrice + parseFloat(newItem.getValue("price")),
                    this.totalWeight = this.totalWeight + parseFloat(
                        newItem.getValue("weight"))), this.updateCookie(),
                this.updatePageElements()
        }, this.addItem = function(t) {
            var e = 0;
            for (e = 0; e < this.items.length; e++) {
                var i = this.items[e];
                if (i.equalTo(t)) return i.addValue("quantity", parseInt(t.getValue(
                        "quantity")) + parseInt(i.getValue(
                        "quantity"))), this.totalItems = this.totalItems +
                    parseInt(t.getValue("quantity")), this.totalPrice =
                    this.totalPrice + parseInt(t.getValue("quantity")) *
                    parseFloat(t.getValue("price")), void(this.totalWeight =
                        this.totalWeight + parseInt(t.getValue(
                            "quantity")) * parseFloat(t.getValue(
                            "weight")))
            }
            this.items[this.items.length] = t, this.totalItems = this.totalItems +
                parseInt(t.getValue("quantity")), this.totalPrice = this.totalPrice +
                parseInt(t.getValue("quantity")) * parseFloat(t.getValue(
                    "price")), this.totalWeight = this.totalWeight +
                parseInt(t.getValue("quantity")) * parseFloat(t.getValue(
                    "weight"))
        }, this.updateCookie = function() {
            for (cookieString = String(this.totalItems) + "&" + String(this
                    .totalPrice) + "&" + String(this.totalWeight), x = 0, x =
                0; x < this.items.length; x++) tempItem = this.items[x],
                cookieString = cookieString + "&" + tempItem.cookieString();
            createCookie("simpleCart", cookieString, 30)
        }, this.empty = function() {
            return this.items = new Array, this.totalItems = 0, this.totalPrice =
                0, this.totalWeight = 0, this.updateCookie(), this.updatePageElements(), !
                1
        }, this.deleteItem = function(t) {
            found = !1;
            var e = new Array;
            for (x = 0; x < this.items.length; x++) tempItem = this.items[x],
                tempItem.equalTo(t) && (found = !0, this.totalItems = this.totalItems -
                    parseFloat(tempItem.getValue("quantity")), this.totalPrice =
                    this.totalPrice - parseFloat(tempItem.getValue("price")),
                    this.totalWeight = this.totalWeight - parseFloat(
                        tempItem.getValue("weight"))), found ? x < this.items
                .length - 1 && (e[x] = this.items[x + 1]) : e[x] = this.items[
                    x];
            return this.items = e, this.updateCookie(), this.updatePageElements(), !
                1
        }, this.options = function() {
            var t = 0;
            for (t = 0; t < this.items.length; t++) {
                var e = this.items[t];
                if (e.optionList()) return !0
            }
            return !1
        }, this.updatePageElements = function() {
            var t, e = 0,
                i = getElementsByClassName("simpleCart_total");
            for (e = 0; e < i.length; e++) t = i[e], t.innerHTML = this.returnTotalPrice();
            for (e = 0, i = getElementsByClassName("simpleCart_quantity"),
                e = 0; e < i.length; e++) t = i[e], t.innerHTML = String(
                this.totalItems);
            for (i = getElementsByClassName("fortotalPrice"), e = 0; e < i.length; e++)
                t = i[e], t.innerHTML = String(this.returnTotalHarga());
            for (i = getElementsByClassName("simpleCart_weight"), e = 0; e <
                i.length; e++) t = i[e], t.innerHTML = String(this.returnTotalWeight());
            for (i = getElementsByClassName("simpleCart_items"), e = 0; e <
                i.length; e++) {
                cartTable = i[e], newRow = document.createElement("div");
                for (var e = 0, n = 0; cartTable.childNodes[0];) cartTable.removeChild(
                    cartTable.childNodes[0]);
                for (e = 0; e < this.ItemColumns.length; e++)("Options" !=
                    this.ItemColumns[e] || this.options()) && (tempCell =
                    document.createElement("div"), tempCell.innerHTML =
                    this.ItemColumns[e], tempCell.className = "item" +
                    this.ItemColumns[e], newRow.appendChild(tempCell));
                for (newRow.className = "cartHeaders", cartTable.appendChild(
                    newRow), e = 0, e = 0; e < this.items.length; e++) {
                    for (tempItem = this.items[e], newRow = document.createElement(
                        "div"), n = 0, n = 0; n < this.ItemColumns.length; n++)
                        tempCell = document.createElement("div"), tempCell.className =
                        "item" + this.ItemColumns[n], "Image" == this.ItemColumns[
                            n] && tempItem.getValue("image") && (tempCell.innerHTML =
                            '<img src="' + tempItem.getValue("image") +
                            '" />'), "Name" == this.ItemColumns[n] ?
                        tempCell.innerHTML = tempItem.getValue("name") :
                        "Price" == this.ItemColumns[n] ? tempCell.innerHTML =
                        this.returnFormattedPrice(tempItem.getValue("price")) :
                        "Options" == this.ItemColumns[n] && this.options() ?
                        tempCell.innerHTML = tempItem.optionList() :
                        "Quantity" == this.ItemColumns[n] ? tempCell.innerHTML =
                        '<input type="number" onblur="simpleCart.updateQuantity(' +
                        tempItem.functionString() +
                        ",'new_quantity=' + this.value);return false;\"value=\"" +
                        tempItem.getValue("quantity") + '" />' : "Weight" ==
                        this.ItemColumns[n] ? tempCell.innerHTML = this.returnFormattedWeight(
                            tempItem.getValue("weight")) + " kg" : "Total" ==
                        this.ItemColumns[n] ? tempCell.innerHTML = this.returnFormattedPrice(
                            tempItem.getValue("quantity") * tempItem.getValue(
                                "price")) : "Remove" == this.ItemColumns[n] &&
                        (tempCell.innerHTML =
                            '<a class="removeButton" onclick="simpleCart.updateQuantity(' +
                            tempItem.functionString() +
                            ",'new_quantity=0');return false;\">Remove</a>"
                        ), newRow.appendChild(tempCell);
                    newRow.className = "itemContainer", cartTable.appendChild(
                        newRow)
                }
                newRow = document.createElement("div"), tempCell = document
                    .createElement("div"), tempCell.innerHTML = String(this
                        .totalItems), tempCell.className = "totalItems",
                    newRow.appendChild(tempCell), tempCell = document.createElement(
                        "div"), tempCell.innerHTML = this.returnTotalPrice(),
                    tempCell.className = "totalPrice", newRow.appendChild(
                        tempCell), tempCell = document.createElement("div"),
                    tempCell.innerHTML = this.returnTotalWeight(), tempCell
                    .className = "totalWeight", newRow.appendChild(tempCell),
                    newRow.className = "totalRow", cartTable.appendChild(
                        newRow)
            }
            for (i = getElementsByClassName("simpleCart_table"), e = 0; e <
                i.length; e++) {
                cartTable = i[e];
                for (var e = 0, n = 0; cartTable.childNodes[0];) cartTable.removeChild(
                    cartTable.childNodes[0]);
                for (newRow = document.createElement("tr"), e = 0; 6 > e; e++)
                    ("Options" != this.ItemColumns[e] || this.options()) &&
                    (tempCell = document.createElement("th"), tempCell.innerHTML =
                        this.ItemColumns[e], tempCell.className = "item" +
                        this.ItemColumns[e], newRow.appendChild(tempCell));
                for (newRow.className = "thead", cartTable.appendChild(
                    newRow), e = 0, e = 0; e < this.items.length; e++) {
                    for (tempItem = this.items[e], newRow = document.createElement(
                        "tr"), n = 0, n = 0; 6 > n; n++) tempCell =
                        document.createElement("td"), tempCell.className =
                        "item" + this.ItemColumns[n], "Image" == this.ItemColumns[
                            n] && tempItem.getValue("image") && (tempCell.innerHTML =
                            '<img src="' + tempItem.getValue("image") +
                            '" />'), "Name" == this.ItemColumns[n] ?
                        tempCell.innerHTML = tempItem.getValue("name") :
                        "Price" == this.ItemColumns[n] ? tempCell.innerHTML =
                        this.returnFormattedPrice(tempItem.getValue("price")) :
                        "Quantity" == this.ItemColumns[n] ? tempCell.innerHTML =
                        tempItem.getValue("quantity") : "Weight" == this.ItemColumns[
                            n] ? tempCell.innerHTML = this.returnFormattedWeight(
                            tempItem.getValue("weight")) + " kg" : "Total" ==
                        this.ItemColumns[n] && (tempCell.innerHTML = this.returnFormattedPrice(
                            tempItem.getValue("quantity") * tempItem.getValue(
                                "price"))), newRow.appendChild(tempCell);
                    newRow.className = "cartHeaders", cartTable.appendChild(
                        newRow)
                }
            }
            return !1
        }, this.returnTotalHarga = function() {
            return this.totalPrice
        }, this.returnTotalPrice = function() {
            return this.returnFormattedPrice(this.totalPrice)
        }, this.returnTotalWeight = function() {
            return this.returnFormattedWeight(this.totalWeight)
        }, this.returnFormattedPrice = function(t) {
            return temp = Math.round(100 * t), change = String(temp % 100),
                0 == change.length ? change = "00" : 1 == change.length &&
                (change = "0" + change), temp = formatNumber(temp / 100), e +
                temp + "." + change
        }, this.returnFormattedWeight = function(t) {
            var e = new Number(t + "").toFixed(parseInt(2)),
                i = parseFloat(e);
            return i
        }, this.updateQuantity = function() {
            for (newItem = new item, x = 0, x = 0; x < arguments.length; x++)
                if (temp = arguments[x], data = temp.split("="),
                    "new_quantity" == data[0]) var t = data[1];
                else newItem.addValue(data[0], data[1]);
            return 1 > t ? void this.deleteItem(newItem) : (newQuan = t -
                newItem.getValue("quantity"), newItem.addValue(
                    "quantity", newQuan), this.addItem(newItem), this.updateCookie(),
                this.updatePageElements(), !1)
        }, this.checkOut = function() {
            if (0 == this.totalItems) return alert("Your cart is empty!"), !
                1;
            var t, e = "scrollbars,location,resizable,status",
                i = 0,
                n =
                "https://www.paypal.com/cgi-bin/webscr?cmd=_cart&upload=1&business=" +
                this.userEmail + "&currency_code=USD&lc=US";
            for (t = 0, t = 0; t < this.items.length; t++) tempItem = this.items[
                    t], i = t + 1, n = n + "&item_name_" + i + "=" +
                tempItem.getValue("name") + "&item_number_" + i + "=" + i +
                "&quantity_" + i + "=" + tempItem.getValue("quantity") +
                "&amount_" + i + "=" + this.returnFormattedPrice(tempItem.getValue(
                    "price")) + "&no_shipping_" + i + "=0&no_note_" + i +
                "=1", tempItem.optionList() && (n = n + "&on0_" + i +
                    "=Options&os0_" + i + "=" + tempItem.optionList());
            return window.open(n, "paypal", e), !1
        }
}

function item() {
    this.names = new Array, this.values = new Array, this.addValue =
        function(t, e) {
            if (this.names.length != this.values.length) return alert(
                "name and value array lengths do not match for this item!"
            ), !1;
            found = !1;
            var i = 0;
            for (i = 0; i < this.names.length; i++)
                if (this.names[i] == t) return void(this.values[i] = e);
            found || (this.names[this.names.length] = t, this.values[this.values
                .length] = e)
        }, this.getValue = function(t) {
            var e = 0;
            for (e = 0; e < this.names.length; e++)
                if (t == this.names[e]) return this.values[e];
            return null
        }, this.equalTo = function(t) {
            if (this.getSize() != t.getSize()) return !1;
            var e = 0;
            for (e = 0; e < this.names.length; e++)
                if ("quantity" != this.names[e] && t.getValue(this.names[e]) !=
                    this.values[e]) return !1;
            return !0
        }, this.getSize = function() {
            return this.names.length
        }, this.cookieString = function() {
            returnString = "";
            var t = 0;
            for (returnString = this.names[t] + "=" + this.values[t], t = 1,
                t = 1; t < this.names.length; t++) returnString =
                returnString + "," + this.names[t] + "=" + this.values[t];
            return returnString
        }, this.functionString = function() {
            returnString = "'";
            var t = 0;
            for (returnString = "'" + this.names[t] + "=" + this.values[t],
                t = 1, t = 1; t < this.names.length; t++) returnString =
                returnString + "','" + this.names[t] + "=" + this.values[t];
            return returnString += "'", returnString
        }, this.optionList = function() {
            if (returnString = "", this.getSize() < 4) return null;
            var t = 0;
            for (t = 0; t < this.names.length; t++) "quantity" != this.names[
                t] && "price" != this.names[t] && "weight" != this.names[
                t] && "name" != this.names[t] && "image" != this.names[
                t] && (returnString = returnString + this.names[t] +
                ":" + this.values[t] + ", ");
            for (;
                "," == returnString.charAt(returnString.length - 1) || " " ==
                returnString.charAt(returnString.length - 1) || ":" ==
                returnString.charAt(returnString.length);) returnString =
                returnString.substring(0, returnString.length - 1);
            return returnString
        }
}

function createCookie(t, e, i) {
    if (i) {
        var n = new Date;
        n.setTime(n.getTime() + 24 * i * 60 * 60 * 1e3);
        var a = "; expires=" + n.toGMTString()
    } else var a = "";
    document.cookie = t + "=" + e + a + "; path=/"
}

function readCookie(t) {
    for (var e = t + "=", i = document.cookie.split(";"), n = 0; n < i.length; n++) {
        for (var a = i[n];
            " " == a.charAt(0);) a = a.substring(1, a.length);
        if (0 == a.indexOf(e)) return a.substring(e.length, a.length)
    }
    return null
}

function eraseCookie(t) {
    createCookie(t, "", -1)
}

function createCart() {
    simpleCart.initialize()
}
var getElementsByClassName = function(t, e, i) {
        return (getElementsByClassName = document.getElementsByClassName ?
            function(t, e, i) {
                i = i || document;
                for (var n, a = i.getElementsByClassName(t), s = e ? new RegExp(
                        "\\b" + e + "\\b", "i") : null, r = [], l = 0,
                    m = a.length; m > l; l += 1) n = a[l], (!s || s.test(n.nodeName)) &&
                    r.push(n);
                return r
            } : document.evaluate ? function(t, e, i) {
                e = e || "*", i = i || document;
                for (var n, a, s = t.split(" "), r = "", l =
                    "http://www.w3.org/1999/xhtml", m = document.documentElement
                    .namespaceURI === l ? l : null, o = [], u = 0, h =
                    s.length; h > u; u += 1) r +=
                    "[contains(concat(' ', @class, ' '), ' " + s[u] +
                    " ')]";
                try {
                    n = document.evaluate(".//" + e + r, i, m, 0, null)
                } catch (g) {
                    n = document.evaluate(".//" + e + r, i, null, 0, null)
                }
                for (; a = n.iterateNext();) o.push(a);
                return o
            } : function(t, e, i) {
                e = e || "*", i = i || document;
                for (var n, a, s = t.split(" "), r = [], l = "*" === e && i
                    .all ? i.all : i.getElementsByTagName(e), m = [], o =
                    0, u = s.length; u > o; o += 1) r.push(new RegExp(
                    "(^|\\s)" + s[o] + "(\\s|" + matauang + ")"));
                for (var h = 0, g = l.length; g > h; h += 1) {
                    n = l[h], a = !1;
                    for (var p = 0, c = r.length; c > p && (a = r[p].test(n
                        .className), a); p += 1);
                    a && m.push(n)
                }
                return m
            })(t, e, i)
    },
    ElementCheckInterval = setInterval("simpleCart.updatePageElements()", 1e4);
window.onload = createCart;
