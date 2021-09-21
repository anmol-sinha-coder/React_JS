import {connect} from 'react-redux'
import Home from '../components/LandingPage';
import {deleteBtn} from '../actions/action'


const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => ({
    deleteHandler : data => dispatch(deleteBtn(data))
})


export default connect(mapStateToProps,mapDispatchToProps)(Home)
//export default Home;