import React from 'react';
import './Rightbar.css';
import giftIcon from '../../assets/gift.png';
function Rightbar() {
	return (
		<div>
			<div className="birthday-container">
				<img className="birthday-img" src={giftIcon} alt="" />
				<span className="birthday-text">
					<b>Friend1</b> and <b>3 other friends</b> have a birhday today.
				</span>
			</div>
			<img
				className="rightbar-ad"
				src="https://res.cloudinary.com/dbh0wt0zm/image/upload/v1638611196/Socio_admin/ad5_ap74sb.jpg"
				alt=""
			/>
		</div>
	);
}

export default Rightbar;
