import SectionWrapper from '../SectionWrapper';
import Cabinet from './Cabinet';
import Goals from './Goals';
import JourneyGallery from './Journey';

export default function HistoryAndGoalsSection(): JSX.Element {
  return (
    <>
      <SectionWrapper id="journey-gallery" className="bg-[#F5E6D3]" childClass='px-2'>
        <JourneyGallery />
      </SectionWrapper>

      <SectionWrapper
        id="history-and-goals"
        className=" pt-3 bg-gradient-to-r from-gray-50 to-gray-100"
      >
        <Goals />

        {/* <RulesAndRegulations /> */}
      </SectionWrapper>

      <SectionWrapper
        id="history-and-goals"
        className="bg-gradient-to-r from-[#fdfcfb] via-[#f8f8f8] to-[#ece9e6]"
      >
        <Cabinet />
        {/* <RulesAndRegulations /> */}
      </SectionWrapper>
    </>
  );
}