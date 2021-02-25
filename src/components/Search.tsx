import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import searchStyles from '@/styles/Search.module.scss'

interface PageProps {
  searchValue: string
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSearchSubmit: (e: React.FormEvent) => void
}

const Search = ({
  searchValue,
  handleSearchChange,
  handleSearchSubmit
}: PageProps) => {
  return (
    <form className={searchStyles.search} onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Search for a random GIF by Tag!"
        value={searchValue}
        onChange={handleSearchChange}
        required
      />
      <button>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  )
}

export default Search
