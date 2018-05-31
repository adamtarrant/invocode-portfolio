module.exports = {
    //Utility function for adding/removing a class to multiple selectors and elements
    applyClassToMultipleEls: function (selectors, className, action) {
        if (!selectors) return;
        let nodeListArr = [];
        selectors.forEach(selector => {
            nodeListArr.push(document.querySelectorAll(selector));
        });
        nodeListArr.forEach(nodeList => {
            Array.from(nodeList).forEach(el => {
                el["classList"][action](className);
            });
        });
    },
    //Utility function for adding event listener to all elements in the one selector
    superAddEventListener: function (selector, event, handler) {
        if (!selector) return;
        let elements = Array.from(document.querySelectorAll(selector));
        elements.forEach(el => {
            el.addEventListener(event, handler);
        });
    }
};