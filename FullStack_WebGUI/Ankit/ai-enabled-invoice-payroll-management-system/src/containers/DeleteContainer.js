import {connect} from 'react-redux'
import Delete from '../components/Delete';
import {deleteBtn} from '../actions/action'


const mapStateToProps = state => ({   
    
})
const mapDispatchToProps = dispatch => ({
    deleteHandler : data => dispatch(deleteBtn(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(Delete)

//export default Home;
