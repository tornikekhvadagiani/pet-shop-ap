import styled from "styled-components";
export const StyledManageHeader = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  justify-content: center;
  width: 100%;
`;

export const StyledAnimalsContainer = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 12px;
`;

export const StyledListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid #444;

  span {
    min-width: 25%;
  }
`;
export const StyledCategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid #444;

  span {
    min-width: 50%;
  }
`;
export const StyledListItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #444;
  color: black;
  margin: 5px 0px 20px 0px;
  align-items: center;
  position: relative;
  &:last-child {
    border-bottom: none;
  }
  span {
    min-width: 25%;
  }
`;
export const StyledListItemCategory = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #444;
  color: black;
  margin: 5px 0px 20px 0px;
  align-items: center;
  position: relative;
  &:last-child {
    border-bottom: none;
  }
  span {
    min-width: 50%;
  }
`;

export const StyledPopularBadge = styled.span<{ $isPopular: boolean }>`
  background: ${({ $isPopular }) => ($isPopular ? "#4CAF50" : "#FF5722")};
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  color: white;
`;

export const StyledPrice = styled.span`
  color: limegreen;
  font-weight: bold;
`;

export const StyledStock = styled.span<{ $stock: number }>`
  color: ${({ $stock }) => ($stock > 0 ? "#4CAF50" : "#FF5722")};
  font-weight: bold;
`;

export const StyledEdit = styled.div`
  position: absolute;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  transition: all 0.1s;
  font-size: 20px;
  gap: 10px;
  display: flex;
`;

export const StyledSpan = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
