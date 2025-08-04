import React from 'react'
import './footer.css'
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import CloudIcon from '@mui/icons-material/Cloud';
const Footer = () => {

    const todayDate = new Date()
    return (
        <div className='footer'>
            <div className='foooter-left'>
                <img className='footer-logo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkJtJ4D6w4wSAXxqwL73vKa4yPqs38Hp3K3CecpruwWlddPgLlppTzc2U&s' />
                <div className='footer-text-white'>Veer Surendra Sai University of Technology</div>
                <div className='footer-text-white'>Burla</div>
                <div className='footer-text-smaller'>Sambalpur, Odisha- 768018</div>
                <div className='footer-text-smaller'><PhoneIcon />8480441756</div>
                <div className='footer-text-smaller'><LanguageIcon /> www.vssut.ac.in</div>
            </div>

            <div className='foooter-center'>
                <div className='important-link'>Important Links</div>
                <a href='https://www.vssut.ac.in/anti-ragging.php' target='_blank'>Anti-Ragging Initiative</a>
                <a href='https://www.vssut.ac.in/placement-cell-placement-brochure.php' target='_blank'>Placement Cell</a>
                <a href='https://www.vssut.ac.in/rti.php' target='_blank'>Right To Information</a>
                <a href='https://www.vssut.ac.in/payment-instruction.php' target='_blank'>Sem Reg Fee Payment</a>
                <a href='https://www.vssut.ac.in/faculty-activities.php' target='_blank'>Faculty Activity</a>
                <a href='https://www.vssut.ac.in/contact-us.php' target='_blank'>Contact Us</a>
                <a href='https://www.vssut.ac.in/' target='_blank'>College Official Website</a>

            </div>

            <div className='footer-right'>
                <div className='footer-right-name'><CloudIcon/>VSSUT,Burla</div>
                <div className='today-date-footer'>{todayDate.toDateString()}</div>
            </div>
        </div>
    )
}

export default Footer