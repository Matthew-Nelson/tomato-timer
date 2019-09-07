import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';


export default class FAQ extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false
        }
    }

    handleModalOpen = () => {
        this.setState({
            modalOpen: true
        })
    }

    handleModalClose = () => {
        this.setState({
            modalOpen: false
        })
    };

    render() {
        return (
            <div>
                <button onClick={this.handleModalOpen}>Open the FAQ Modal</button>
                <Modal open={this.state.modalOpen} onClose={this.handleModalClose} >
                    <div className={'modal-window'}>
                        <h2>FAQ Section</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur mattis enim mauris, et facilisis libero lacinia quis. Nam arcu lectus, sodales in nisl quis, tempus tempor tellus. Phasellus eu pulvinar urna. Sed vel semper dui. Praesent aliquet vulputate nisl a cursus. Phasellus finibus eleifend metus, ut faucibus quam pulvinar vel. Aliquam bibendum nibh augue, quis scelerisque tortor sodales eu. Nullam in risus massa.</p>

                        <p>Phasellus sollicitudin sem sit amet velit eleifend, ac efficitur purus fringilla. Etiam nec odio vulputate, volutpat diam ac, molestie risus. Etiam imperdiet turpis a rutrum semper. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec convallis sollicitudin luctus. Nulla euismod leo nunc, non gravida massa sollicitudin at. Suspendisse rutrum eu nunc in ornare. Duis luctus nunc at eros tincidunt dignissim. In quis tristique velit. Pellentesque purus nulla, rhoncus id massa nec, tempor condimentum odio. Donec dictum porta purus, eget gravida orci.</p>

                        <p>Morbi consequat felis egestas orci sodales iaculis. In maximus neque elit, sit amet consequat neque ullamcorper sit amet. Praesent eget sapien lorem. Cras eget aliquet purus. Ut vel porta sapien, id semper metus. Curabitur lacus neque, accumsan ut cursus at, consequat at ex. Nullam consequat nisl vitae magna sollicitudin, vehicula semper nisi mattis. Praesent nibh nisl, facilisis a nulla nec, molestie mattis mi. Cras sed massa est. Vestibulum et sem eu justo mollis volutpat nec ac lectus. Curabitur nec nisl leo. Duis aliquam elit a nisl vehicula, gravida cursus eros varius. Pellentesque eu imperdiet sapien. Phasellus sit amet turpis id purus ultricies tristique quis vitae leo. Donec est orci, eleifend vitae diam in, vestibulum feugiat turpis. Maecenas accumsan ante urna, ac pretium neque hendrerit a.</p>

                        <p>Aenean vitae massa est. Vivamus congue leo odio, porttitor scelerisque orci iaculis tristique. Sed nisi velit, interdum at eros at, dapibus mollis turpis. Aenean iaculis, enim ut porta iaculis, leo dolor elementum quam, non euismod erat mauris nec velit. Quisque pharetra, ante in porta ultricies, magna dolor lacinia nisl, sit amet feugiat nulla tortor eu nisl. Fusce rhoncus tortor nec tortor gravida, non sodales nibh tempor. Mauris vulputate mollis metus id ultrices. Maecenas nec molestie magna. Nulla interdum, elit id semper laoreet, nisi eros suscipit est, vel interdum est dui dictum lacus. Nulla posuere erat leo, congue placerat augue rutrum eu. Maecenas nec cursus urna, et lacinia nulla. Vestibulum aliquet mi nibh, eu porta ex ultricies dictum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;</p>
                    </div>
                </Modal>
            </div>
        )
    }
}
