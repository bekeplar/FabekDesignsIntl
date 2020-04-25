import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserNav from 'views/account/UserAvatar';

import {
  HOME, SIGNIN, SIGNUP, SEARCH
} from 'constants/routes';
import Home from 'views/home/Home';
import Badge from '../Badge';
import BasketToggle from '../../basket/BasketToggle';

const Navigation = ({
  path,
  disabledPaths,
  basketLength,
  isAuthenticating,
  profile,
  isAuth,
  history
}) => (
  <nav className="mobile-navigation">
    <div className="mobile-navigation-main">
      <div className="mobile-navigation-logo">
        <Link to={HOME}>
          <h3 className="margin-0 color-light">FabekDesignsIntl</h3>
        </Link>
      </div>
      <div className="product-search-wrapper">
        <input
            className="search-input product-search-input"
            onClick={() => history.push(SEARCH)}
            placeholder="Search for product"
            readOnly
            type="text"
        />
        <div className="searchbar-icon" />
      </div>
    </div>
    <ul className="mobile-navigation-menu">
      <BasketToggle>
        {({ onClickToggle }) => (
          <li className="basket-toggle mobile-navigation-item">
            <button
                className="navigation-menu-link button-link"
                disabled={disabledPaths.includes(path)}
                onClick={onClickToggle}
            >
              <span>
                <Badge count={basketLength}/>
                My Cart
              </span>
            </button>
          </li>
        )}
      </BasketToggle>
      {isAuth ? (
        <li className="mobile-navigation-item">
          <UserNav isAuthenticating={isAuthenticating}
              profile={profile}
          />
        </li>
      ) : (
        <>
          {path !== SIGNUP && (
            <li className="mobile-navigation-item">
              <Link
                  className="navigation-menu-link"
                  to={SIGNUP}
              >
                Sign Up
              </Link>
            </li>
          )}
          {path !== SIGNIN && (
            <li className="mobile-navigation-item">
              <Link
                  className="navigation-menu-link"
                  to={SIGNIN}
              >
                Sign In
              </Link>
            </li>
          )}
        </>
      )}
    </ul>
  </nav>
);

Navigation.propType = {
  path: PropTypes.string.isRequired,
  disabledPaths: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default withRouter(Navigation);
