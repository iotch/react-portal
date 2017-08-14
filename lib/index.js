"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var react_dom_1 = require("react-dom");
/**
 * Component renders its children into a new "subtree"
 * outside the current component hierarchy.
 * The children will be appended to the container specified.
 */
var Portal = (function (_super) {
    tslib_1.__extends(Portal, _super);
    function Portal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * lifecycle methods
     */
    Portal.prototype.componentDidMount = function () {
        this.open();
    };
    Portal.prototype.componentDidUpdate = function () {
        this.update(this.props.to);
    };
    Portal.prototype.componentWillUnmount = function () {
        this.close();
    };
    /**
     * native render
     */
    Portal.prototype.render = function () {
        return null;
    };
    /**
     * Opens a portal into destination
     *
     * @param  {Element} dest
     * @return {void}
     */
    Portal.prototype.open = function (dest) {
        var self = this;
        dest = dest || self.props.to;
        this.domNode = react_dom_1.findDOMNode(dest);
        if (this.domNode) {
            this.portal = this.domNode.appendChild(document.createElement('div'));
            this.contents = this._render(this.portal, self.props.children);
        }
    };
    /**
     * Moves portal or updates it's contents
     *
     * @param  {Element} newDest
     * @return {void}
     */
    Portal.prototype.update = function (newDest) {
        var self = this;
        var newNode = react_dom_1.findDOMNode(newDest);
        // destination element has changed
        if (self.domNode !== newNode) {
            self.close();
            self.open(newDest);
            // refresh
        }
        else {
            // replace contents to imitate update
            this.contents = this._render(this.portal, self.props.children);
        }
    };
    /**
     * Closes the portal
     *
     * @return {void}
     */
    Portal.prototype.close = function () {
        var portal = this.portal;
        if (portal) {
            react_dom_1.unmountComponentAtNode(portal);
            portal.parentNode.removeChild(portal);
        }
        this.domNode = null;
    };
    /**
     * Renders the portal contents into contaner element
     *
     * @param  {Element} container
     * @param  {Obejct} component
     * @return {void}
     */
    Portal.prototype._render = function (container, child) {
        if (child != null) {
            react_dom_1.unstable_renderSubtreeIntoContainer(this, child, container);
            // close portal when child is null
        }
        else {
            this.close();
        }
        return child;
    };
    return Portal;
}(react_1.Component));
exports.default = Portal;
