import React from 'react'
import { useParams } from 'react-router-dom'
import './UserSettings.css'
import AccountSettings from './AccountSettings'
import ChangePassword from './ChangePassword'
import UserSidebar from './UserSidebar'
import Banner from '../Banner/Banner'
import banner_image from '../../assets/banner-image.png'

const UserSettings = () => {

    const { activepage } = useParams()
    return (

        <div className='userprofile'>
            <Banner
                heading={`My Profile`}
                bannerimage={banner_image}
            />

            <div className='userprofilein'>
                <div className='left-settings'>
                    <UserSidebar activepage={activepage} />
                </div>
                <div className='right-settings'>
                    {activepage === 'accountsettings' && <AccountSettings />}
                    {activepage === 'changepassword' && <ChangePassword />}
                </div>
            </div>
            <br /><br /><br />
        </div>
    )
}

export default UserSettings
