﻿$(function () {

    QuickSidebar.init(); // init quick sidebar

    // clause button
    $('#clauses-button').click(function () {

    });

    // admin button
    $('#admin-button').click(function () {
        loadAdminSlider();
    });

    // contact button
    $('#contacts-button').click(function () {
        loadContactSlider();
    });

});

function loadAdminSlider() {
    $("#slider-contents").html('');
    $.ajax({
        type: "Get",
        url: "/Eform/loadAdminSlider/",
        cache: false
    }).done(function (data) {
        isAjaxRequestTimeOut(data);
        $("#slider-contents").html(data);
    }).fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });
}

function loadContactSlider() {
    $("#slider-contents").html('');
    $.ajax({
        type: "Get",
        url: "/Eform/loadContactSlider/",
        cache: false
    }).done(function (data) {
        isAjaxRequestTimeOut(data);
        $("#slider-contents").html(data);
    }).fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });
}

function handleQuickSidebarChat() {
    var wrapper = $('.page-quick-sidebar-wrapper');
    var wrapperChat = wrapper.find('.page-quick-sidebar-chat');

    var initChatSlimScroll = function () {
        var chatUsers = wrapper.find('.page-quick-sidebar-chat-users');
        var chatUsersHeight;


        //Jared Code Change 20-08-15 -- Replaced Below to fix ipad sidebar scrolling issue with: 
        //chatUsersHeight = wrapper.height() - wrapper.find('.nav-justified > .nav-tabs').outerHeight();
        /*This:*/chatUsersHeight = 700;



        // chat user list 
        Metronic.destroySlimScroll(chatUsers);
        chatUsers.attr("data-height", chatUsersHeight);
        Metronic.initSlimScroll(chatUsers);

        var chatMessages = wrapperChat.find('.page-quick-sidebar-chat-user-messages');
        var chatMessagesHeight = chatUsersHeight - wrapperChat.find('.page-quick-sidebar-chat-user-form').outerHeight() - wrapperChat.find('.page-quick-sidebar-nav').outerHeight();

        // user chat messages 
        Metronic.destroySlimScroll(chatMessages);
        chatMessages.attr("data-height", chatMessagesHeight);
        Metronic.initSlimScroll(chatMessages);
    };

    initChatSlimScroll();
    Metronic.addResizeHandler(initChatSlimScroll); // reinitialize on window resize

    wrapper.find('.page-quick-sidebar-chat-users .media-list > .media').click(function () {
        wrapperChat.addClass("page-quick-sidebar-content-item-shown");
    });

    wrapper.find('.page-quick-sidebar-chat-user .page-quick-sidebar-back-to-list').click(function () {
        wrapperChat.removeClass("page-quick-sidebar-content-item-shown");
    });

    var handleChatMessagePost = function (e) {
        e.preventDefault();

        var chatContainer = wrapperChat.find(".page-quick-sidebar-chat-user-messages");
        var input = wrapperChat.find('.page-quick-sidebar-chat-user-form .form-control');

        var text = input.val();
        if (text.length === 0) {
            return;
        }

        var preparePost = function (dir, time, name, avatar, message) {
            var tpl = '';
            tpl += '<div class="post ' + dir + '">';
            tpl += '<img class="avatar" alt="" src="' + Layout.getLayoutImgPath() + avatar + '.jpg"/>';
            tpl += '<div class="message">';
            tpl += '<span class="arrow"></span>';
            tpl += '<a href="#" class="name">Bob Nilson</a>&nbsp;';
            tpl += '<span class="datetime">' + time + '</span>';
            tpl += '<span class="body">';
            tpl += message;
            tpl += '</span>';
            tpl += '</div>';
            tpl += '</div>';

            return tpl;
        };

        // handle post
        var time = new Date();
        var message = preparePost('out', (time.getHours() + ':' + time.getMinutes()), "Bob Nilson", 'avatar3', text);
        message = $(message);
        chatContainer.append(message);

        var getLastPostPos = function () {
            var height = 0;
            chatContainer.find(".post").each(function () {
                height = height + $(this).outerHeight();
            });

            return height;
        };

        chatContainer.slimScroll({
            scrollTo: getLastPostPos()
        });

        input.val("");

        // simulate reply
        setTimeout(function () {
            var time = new Date();
            var message = preparePost('in', (time.getHours() + ':' + time.getMinutes()), "Ella Wong", 'avatar2', 'Lorem ipsum doloriam nibh...');
            message = $(message);
            chatContainer.append(message);

            chatContainer.slimScroll({
                scrollTo: getLastPostPos()
            });
        }, 3000);
    };

    wrapperChat.find('.page-quick-sidebar-chat-user-form .btn').click(handleChatMessagePost);
    wrapperChat.find('.page-quick-sidebar-chat-user-form .form-control').keypress(function (e) {
        if (e.which == 13) {
            handleChatMessagePost(e);
            return false;
        }
    });
};