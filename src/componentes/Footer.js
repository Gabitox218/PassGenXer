import { FormattedMessage } from "react-intl";
import "./Footer.css";

const Footer = () => {
  let date = new Date();
  let year = date.getFullYear();
    return ( 
        <footer className="footer">
			<div className="copyright">
        <p>
          <FormattedMessage id="footer.copyright" defaultMessage="Copyright"/> &copy; {year} GabyXer. 
        </p>
        <p>
          <FormattedMessage id="footer.text" defaultMessage="All rights reserved."/>
        </p>
			</div>
		</footer>
     );
}
 
export default Footer;