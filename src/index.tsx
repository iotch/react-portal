import { Component } from 'react';
import { unstable_renderSubtreeIntoContainer, findDOMNode, unmountComponentAtNode } from 'react-dom';

/**
 * Component renders its children into a new "subtree"
 * outside the current component hierarchy.
 * The children will be appended to the container specified.
 */
export default class Portal extends Component<Props, any> {

    /**
     * Portal instance
     * @type {Element}
     */
    protected portal: Element;

    /**
     * Portal contents
     * @type {Element}
     */
    protected contents: Element;

    /**
     * Resolved destination dom node to append to
     * @type {Element}
     */
    protected domNode: Element | null;

    /**
     * lifecycle methods
     */
    public componentDidMount() {
        this.open();
    }

    public componentDidUpdate() {
        this.update(this.props.to);
    }

    public componentWillUnmount() {
        this.close();
    }

    /**
     * native render
     */
    public render(): any {
        return null;
    }

    /**
     * Opens a portal into destination
     *
     * @param  {Element} dest
     * @return {void}
     */
    protected open(dest?: Element) {
        const self = this;
        dest = dest || self.props.to;

        this.domNode = findDOMNode(dest);
        if (this.domNode) {
            this.portal = this.domNode.appendChild(document.createElement('div'));
            this.contents = this._render(this.portal, self.props.children);
        }
    }

    /**
     * Moves portal or updates it's contents
     *
     * @param  {Element} newDest
     * @return {void}
     */
    protected update(newDest: Element) {
        const self = this;
        const newNode = findDOMNode(newDest);

        // destination element has changed
        if(self.domNode !== newNode) {
            self.close();
            self.open(newDest);

        // refresh
        } else {
            // replace contents to imitate update
            this.contents = this._render(this.portal, self.props.children);
        }
    }

    /**
     * Closes the portal
     *
     * @return {void}
     */
    protected close() {
        const { portal } = this;
        if (portal) {
            unmountComponentAtNode(portal);
            (portal.parentNode as any).removeChild(portal);
        }
        this.domNode = null;
    }

    /**
     * Renders the portal contents into contaner element
     *
     * @param  {Element} container
     * @param  {Obejct} component
     * @return {void}
     */
    protected _render(container: Element, child: any) {

        if (child != null) {
            unstable_renderSubtreeIntoContainer(this, child, container);

        // close portal when child is null
        } else {
            this.close();
        }

        return child;
    }
}

export interface Props {
    to: Element,
    children: React.ReactElement<any>,
}