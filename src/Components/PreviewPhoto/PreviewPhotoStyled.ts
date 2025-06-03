import styled from 'styled-components';
export const Thumbnail = styled.div<{ isPrincipal: boolean }>`
  width: 80px;
  height: 80px;
  border: 2px solid ${(props) => (props.isPrincipal ? "#2693e6" : "#ccc")};
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  position: relative;

  &:hover {
    border-color: #005bbb;
  }

  &::after {
    content: ${(props) => (props.isPrincipal ? '"Principal"' : '""')};
    position: absolute;
    bottom: 2px;
    left: 2px;
    font-size: 10px;
    color: white;
    background-color: #2693e6;
    padding: 2px 4px;
    border-radius: 3px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
