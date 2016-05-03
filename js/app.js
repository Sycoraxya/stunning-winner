/* 
 Created on : 03-May-2016, 11:08:57
 Author     : Stefan
 */
/**
 * TODO: add automatic sticky-ing of top menu, make padding var
 */
var scrollspy = {
    topMenu: $('#top-menu'),
    topMenuHeight: '',
    menuItems: [],
    scrollItems: [],
    lastId: '',
    init: function () {
        this.topMenuHeight = this.getMenuHeight();
        this.menuItems = this.getMenuItems();
        this.scrollItems = this.getScrollItems();
        this.bind();
    },
    getMenuHeight: function () {
        this.topMenu.outerHeight() + 15;
    },
    getMenuItems: function () {
        return this.topMenu.find('a');
    },
    getScrollItems: function () {
        var scrollItems = this.menuItems.map(function () {
            var item = $($(this).attr("href"));
            if (item.length) {
                return item;
            }
        });
        return scrollItems;
    },
    bind: function () {
        $(window).scroll(function () {
            var scrollTop = $(this).scrollTop() + scrollspy.topMenuHeight,
                curr = scrollspy.scrollItems.map(function () {
                    if ($(this).offset().top < scrollTop) {
                        return this;
                    }
                }),
                curr = curr[curr.length - 1],
                currId = curr && curr.length ? curr[0].id : "";
            if (scrollspy.lastId !== currId) {
                scrollspy.lastId = currId;

                scrollspy.menuItems
                    .parent().removeClass("active")
                    .end().filter("[href='#" + currId + "']").parent().addClass("active");
            }
        });
    }
};

(function () {
    scrollspy.init();
})();
