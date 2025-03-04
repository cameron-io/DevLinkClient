import { Fragment, FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { deleteExperience } from '../../actions/profile'

type Props = {
    experience: any[]
    deleteExperience: any
}

const Experience: FunctionComponent<Props> = ({
    experience,
    deleteExperience,
}) => {
    const experiences = experience.map((exp: any) => (
        <tr key={exp.id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
                {exp.to === null ? (
                    'Now'
                ) : (
                    <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                )}
            </td>
            <td>
                <button
                    onClick={() => deleteExperience(exp.id)}
                    className="btn btn-danger"
                >
                    Delete
                </button>
            </td>
        </tr>
    ))

    return (
        <Fragment>
            <h2 className="my2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,
}

export default connect(null, { deleteExperience })(Experience)
