import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Search = () => {


    const [keyword, setKeyword] = useState("")
    const navigate = useNavigate()

    const handleSearch =(e) => {
        e.preventDefault();

        if(keyword){
            navigate(`/search/${keyword}`)
        }
        else{
            navigate('/')
        }
    }

  return (
      <form onSubmit={handleSearch}>
 <div className="input-group">
          <input
            type="text"
            id="search_field"
            className="form-control"
            placeholder="Enter Product Name..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="input-group-append">
            <button id="search_btn" className="btn">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </form>
   
  )
}

export default Search