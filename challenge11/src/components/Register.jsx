import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


import { registerAuth, loginWithGoogle, logoutFirebase } from '../store/slices/thunks'


const Registro = () => {

        const dispatch = useDispatch()
        const navigate = useNavigate()
        const { email } = useSelector(state => state.auth)
        const handleGoogleLogin = async () => {
        await dispatch(loginWithGoogle());
        navigate('/user');
    };

    const handleLogout = () => {
        dispatch(logoutFirebase());
    };

    const [ formState, setFormState ] = useState({
        email: 'jlopez0318@hotmail.com',
        password: '123456'
    })

    const onInputChange = ( evt ) => {
        const { name, value } = evt.target;
        setFormState({
            ...formState,
            [name]: value
        })
    }

    const onSubmit = async ( event ) => {
        event.preventDefault()
        const { email, password } = formState
        await dispatch( registerAuth( email, password ) )
        navigate('/user')
    }

    return (
        <>
            <h1>Registro</h1>
            <hr />
            <form onSubmit={onSubmit}>
                <input 
                    name='email' 
                    type="email" 
                    onChange={onInputChange} 
                    value={formState.email} 
                />
                <input 
                    name='password' 
                    type="password" 
                    onChange={onInputChange} 
                    value={formState.password} 
                />
                <button type="submit"> Registro </button>
            </form>
            <button onClick={handleGoogleLogin} style={{marginTop: '10px'}}>Login with Google</button>
            <button onClick={handleLogout} style={{marginTop: '10px'}}>Logout</button>
            <button onClick={() => navigate('/crud')} style={{marginTop: '10px'}}>Ir a CRUD</button>
            <button onClick={() => navigate('/realtime')} style={{marginTop: '10px'}}>Ir a Realtime DB</button>
        </>
    )
}

export {Registro}