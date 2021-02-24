import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Loading = () => {
  return (
    <div className="loading">
      <FontAwesomeIcon
        icon={faSpinner}
        spin
        className="loading-icon"
        size="2x"
      />
    </div>
  )
}

export default Loading
