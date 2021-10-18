import React from "react";
import { createPortal } from 'react-dom';
import "../style.css";

interface ModaleProps {
    Hader?: any,
    Body: any,
    footer?: any,
    display: boolean,
}

interface ModaleState {
    display: boolean,
}

export class Modal extends React.Component<ModaleProps, ModaleState> {

    root: HTMLElement;
    el: HTMLElement;
    constructor(props: ModaleProps) {
        super(props);
        this.root = document.getElementById('root')!;
        this.el = document.createElement("div")!;
        this.state = {
            display: true,
        }
    }

    componentDidMount = () => {
        this.root && this.root.append(this.el);
    }
    componentWillUnmount = () => {
        this.root.removeChild(this.el);
    }

    render() {
        const { Body, Hader, footer, display } = this.props;
        const Modal = (
            <div className="modal-div">
                {
                    Hader ?
                        <header className="modale-header">
                            <h1>{Hader}</h1>
                        </header>
                        : null
                }
                <div className="modale-body">
                    {Body}
                </div>
                {
                    footer ?
                        <footer className="modale-footer">
                            {footer}
                        </footer>
                        : null
                }
            </div>
        )
        return display ? createPortal(Modal, this.el) : null;
    }

}