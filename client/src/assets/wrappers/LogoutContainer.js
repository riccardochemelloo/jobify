import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  .logout-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
  }

  .img {
    height: 25px;
    width: 25px;
    border-radius: 50%;
  }

  .dropdown {
    position: absolute;
    top: 45px;
    left: 0;
    width: 100%;
    box-shadow: var(--shadow-2);
    text-align: center;
    background: var(--primary-500);
    border-radius: var(--border-radius);
    visibility: hidden;
  }

  .show-dropdown {
    visibility: visible;
  }

  .dropdown-btn {
    border-radius: var(--border-radius);
    padding: 0.5rem;
    background: transparent;
    border-color: transparent;
    color: var(--white);
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
`;

export default Wrapper;
