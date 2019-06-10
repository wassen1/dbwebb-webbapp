
const utils =  {
    createElement: (options) => {
        let element = document.createElement(options.type || 'div');

        for (let property in options) {
            if (options.hasOwnProperty(property)) {
                element[property] = options[property];
            }
        }

        return element;
    },
    removeNodes: (id) => {
        let element = document.getElementById(id);

        if (element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }
    }
};


export default utils;
