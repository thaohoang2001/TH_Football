import "./listMatching.css"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import TableDataMatching from "../../components/TableDataMatching/TableDataMatching"

const ListMatching = ({columns}) => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <TableDataMatching columns={columns}/>
      </div>
    </div>
  )
}

export default ListMatching