/// <reference types="react" />
import { Component } from 'react';
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
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    /**
     * native render
     */
    render(): any;
    /**
     * Opens a portal into destination
     *
     * @param  {Element} dest
     * @return {void}
     */
    protected open(dest?: Element): void;
    /**
     * Moves portal or updates it's contents
     *
     * @param  {Element} newDest
     * @return {void}
     */
    protected update(newDest: Element): void;
    /**
     * Closes the portal
     *
     * @return {void}
     */
    protected close(): void;
    /**
     * Renders the portal contents into contaner element
     *
     * @param  {Element} container
     * @param  {Obejct} component
     * @return {void}
     */
    protected _render(container: Element, child: any): any;
}
export interface Props {
    to: Element;
    children: React.ReactElement<any>;
}
