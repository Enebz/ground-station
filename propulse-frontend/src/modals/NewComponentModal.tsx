import { FaPlus } from 'react-icons/fa'

import Modal from '../structure/Modal'
import Field from '../components/Field'


// AuthModal Function: Modal for authenticating the user.
const NewComponentModal: React.FC = () => {
  return (
    <Modal
      title="New Component"
      icon={<FaPlus />}
    >
      <Field 
        title="Name"
        required
      />
      <p>Some dummy text</p>
    </Modal>
  )
}

export default NewComponentModal
