import React from 'react';
import { theme } from '../../../../app/theme';
import { useFormatDate } from '../../../../common/useFormatDate';
import { useWindowSize } from '../../../../common/useWindowSize';
import {
    Wrapper,
    ProductionDetails,
    Property,
    DetailsWrapper,
    Detail,
    Biography,
    Image,
    Name
} from './styled';

export const PersonDetails = (props) => {
    const [width] = useWindowSize();

    return (
        <Wrapper>
            <Image src={props.image} />
            <Name>{props.name}</Name>
            <ProductionDetails>
                <DetailsWrapper>
                    <Property>{width >= theme.breakpoint.mobile ? "Date of Birth: " : "Birth: "}</Property>
                    <Detail>{useFormatDate(props.birthday)}</Detail>
                </DetailsWrapper>
                <DetailsWrapper>
                    <Property>Place of birth:</Property>
                    <Detail>{props.birthplace}</Detail>
                </DetailsWrapper>
            </ProductionDetails>
            <Biography>{props.biography}</Biography>
        </Wrapper>)
};


