import React from 'react';

import styles from './DetailReservation.module.scss';
import ContentField from '@/components/common/ContentField/ContentField';
import Button from '@/components/common/Button/Button';
import { CalendarIcon, CheckboxIcon, MarkerIcon } from '@/icons/icon';

const DetailReservation = () => {
  // const location = useLocation();
  return (
    <div>
      <ContentField
        className={`${styles.EstimatedPriceWrapper}`}
        backgroundColor="Gray"
      >
        <div className={styles.EstimatedPriceTitle}>나의 결제 예상 금액</div>
        <div className={styles.EstimatedPriceContainer}>
          <div className={styles.EstimatedPrice}>250,000원</div>
          <div className={styles.PetTypeContent}>
            <div>중형견</div>
            <div className={styles.VerticalDivider} />
            <div>장모종</div>
          </div>
        </div>
      </ContentField>
      <div className={styles.ReservationWrapper}>
        <div className={styles.Title}>예약 일정</div>
        <ContentField className={styles.DateContent} backgroundColor="Gray">
          <CalendarIcon
            className={styles.CalendarIcon}
            width={18}
            height={18}
          />
          <div className={styles.Date}>2023.03.15 오후 1:00</div>
        </ContentField>
      </div>
      <div className={styles.ParkingInfoWrapper}>
        <div className={styles.Title}>방문 주차 위치</div>
        <ContentField className={styles.ParkingInfo} backgroundColor="Gray">
          <MarkerIcon className={styles.MarkerIcon} width={18} height={18} />
          <div className={styles.Address}>서울시 양천구 목동</div>
        </ContentField>
        <ContentField className={styles.DetailAddress} backgroundColor="Gray">
          <input placeholder="상세주소 입력" />
        </ContentField>
      </div>
      <div className={styles.ParkingCheckBoxWrapper}>
        <div className={styles.ParkingCheckBoxContainer}>
          <CheckboxIcon width={20} height={20} />
          <div className={styles.CheckBoxText}>
            주차 공간이 마련되어 있습니다.
          </div>
        </div>
        <div className={styles.ParkingDescription}>
          위 내용을 사실과 다르게 기재한 경우, 서비스 이용에 제한이 있을 수
          있습니다.
        </div>
      </div>
      <div className={styles.ParentInfoWrapper}>
        <div className={styles.Title}>보호자 연락처</div>
        <ContentField className={styles.Telecom} backgroundColor="Gray">
          <input placeholder="통신사 선택" />
        </ContentField>
        <ContentField className={styles.Phone} backgroundColor="Gray">
          <input placeholder="010-0000-0000" />
        </ContentField>
      </div>
      <div className={styles.PetInfoWrapper}>
        <div className={styles.Header}>
          <div className={styles.Title}>반려 동물 정보</div>
          <Button className={styles.AddButton} buttonType="Gray">
            추가하기
          </Button>
        </div>
        {/* 있을떄 */}
        <div className={styles.PetAddWrapper}>
          <div className={styles.PetAddDescription}>
            반려 동물을 등록해보세요.
          </div>
          <Button className={styles.RegistButton} buttonType="Gray">
            등록하기
          </Button>
        </div>
        {/* 없을때 */}
        <ContentField
          backgroundColor="Gray"
          className={styles.PetInfoContainer}
        >
          <div className={styles.PetPhoto}>강아지사진</div>
          <div className={styles.PetInfoBox}>
            <div className={styles.PetNameLine}>
              <div>
                <span className={styles.Name}>김뽀삐</span>
                <span>성별 아이콘</span>
              </div>
              <div>수정(연필) 아이콘</div>
            </div>
            <div className={styles.DetailInfoLine}>
              <div>시고르자브종</div>
              <div className={styles.VerticalDivier} />
              <div>3년 4개월</div>
              <div className={styles.VerticalDivier} />
              <div>3kg</div>
            </div>
          </div>
        </ContentField>
        <div className={styles.HealthWrapper}>
          <ContentField backgroundColor="Gray" className={styles.HealthInfo}>
            <div className={styles.Type}>성향 체크</div>
            <div className={styles.Status}>완료</div>
          </ContentField>
          <ContentField backgroundColor="Gray" className={styles.HealthInfo}>
            <div className={styles.Type}>접종 및 건강</div>
            <div className={styles.Status}>완료</div>
          </ContentField>
        </div>
      </div>
      <div className={styles.BusinessRulesWrapper}>
        <div className={styles.Title}>업체 규정 확인</div>
        <div className={styles.RulesCheckBoxWrapper}>
          <CheckboxIcon width={20} height={20} />
          <div>업체 규정 및 약관을 확인했습니다.</div>
        </div>
        <div className={styles.RulesDescription}>
          위 내용을 사실과 다르게 기재한 경우, 서비스 이용에 제한이 있을 수
          있습니다.
        </div>
      </div>
    </div>
  );
};

export default DetailReservation;
