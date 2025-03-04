import { Fragment, FunctionComponent, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profile'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
import Spinner from '../layout/Spinner'
import { RootState } from '../../store'

type Props = {
    getCurrentProfile: any
    deleteAccount: any
    auth: any
    profile: any
}

const Dashboard: FunctionComponent<Props> = ({
    getCurrentProfile,
    deleteAccount,
    auth: { user },
    profile: { profile, loading },
}) => {
    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile])
    return loading && profile === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fa fa-user"></i> Welcome {user && user.name}
            </p>
            {profile != null ? (
                <Fragment>
                    <DashboardActions />
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} />

                    <div className="my-2">
                        <button
                            className="btn btn-danger"
                            onClick={() => deleteAccount()}
                        >
                            <i className="fas fa-trash-alt"></i>
                            Delete My Account
                        </button>
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    <p>
                        You have not yet created a profile, please add some
                        info.
                    </p>
                    <Link to="/create-profile" className="btn btn-primary my-1">
                        Create Profile
                    </Link>
                </Fragment>
            )}
        </Fragment>
    )
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state: RootState) => ({
    auth: state.auth,
    profile: state.profile,
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
    Dashboard
)
