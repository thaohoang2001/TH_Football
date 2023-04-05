import "./listChildPitch.css"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import TableDataChildPitch from "../../components/TableDataChildPitch/TableDataChildPitch"

const ListChildPitch = ({columns}) => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <TableDataChildPitch columns={columns}/>
      </div>
    </div>
  )
}

export default ListChildPitch