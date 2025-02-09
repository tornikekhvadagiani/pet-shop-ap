import styled from "styled-components";

// Styled Components
export const StyledAnimalsContainer = styled.div`
  width: 100%;
  padding: 20px;
  background: #1e1e2f;
  border-radius: 12px;
`;

export const StyledListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  font-weight: bold;
  background: #292942;
  color: #fff;
  border-radius: 8px;
  span {
    min-width: 25%;
  }
`;

export const StyledListItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #444;
  color: #ddd;
  &:last-child {
    border-bottom: none;
  }
  span {
    min-width: 25%;
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
  color: #f0b90b;
  font-weight: bold;
`;

export const StyledStock = styled.span<{ $stock: number }>`
  color: ${({ $stock }) => ($stock > 0 ? "#4CAF50" : "#FF5722")};
  font-weight: bold;
`;
