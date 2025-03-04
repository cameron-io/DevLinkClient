import { Fragment, FunctionComponent, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { loginAction } from '../../actions/auth'
import { RootState } from '../../store'

type Props = { loginAction: any; isAuthenticated: boolean | null }

const Login: FunctionComponent<Props> = ({ loginAction, isAuthenticated }) => {
    // Set login fields in initialState
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    // Allows to pull fields without formData.name etc
    // To be used in name={*}
    const { email, password } = formData

    // onChange required to allow field input
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // ... is a spread operator to copy the initialized formData fields
        // target is set to direct each input value to all inputs with name='*'
        if (e.target) {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        loginAction(email, password)
    }

    // Redirect if logged in
    if (isAuthenticated) {
        return <Navigate to="/dashboard" />
    }

    // Within html elements:
    // Add value:{*} with * = each formData field
    // Match formData fields to name='*' for simplicity
    // Add onChange for input fields
    // Replace <a href></a> with <Link to></Link>
    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Sign Into Your Account
            </p>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => onChange(e)}
                        minLength={6}
                    />
                </div>
                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Login"
                />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    )
}

Login.propTypes = {
    loginAction: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state: RootState) => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { loginAction })(Login)
