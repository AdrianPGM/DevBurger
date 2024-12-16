import PropTypes from 'prop-types'
import { ReturnHome } from './styles';

export function ReturnButton({ children, ...props }) {
    return <ReturnHome {...props}>{children}</ReturnHome>

}

ReturnButton.propTypes = {
    children: PropTypes.img
}

