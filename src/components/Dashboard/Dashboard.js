import './Dashboard.css'
import AddParticipant from '../AddParticipant/AddParticipant'
import ParticipantList from '../ParticipantList/ParticipantList'
import LoadAPIS from '../Utilities/LoadAPIS'

const Dashboard = () => {
  
  return (
    <div id="container-dashboard">
      <LoadAPIS />
      <div id="container-title-dashboard">
        <h1 id="title-dashboard">Dashboard</h1>
      </div>
      <div id="dashboard-container-1">
        <AddParticipant />
        <ParticipantList />
      </div>
    </div>
  )
}

export default Dashboard