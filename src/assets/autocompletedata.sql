CREATE TABLE `autocompletedata` (
  `no` INTEGER PRIMARY KEY AUTOINCREMENT,
  `consonant` varchar(16),
  `searchWord` varchar(128)
);

--
-- 테이블의 덤프 데이터 `autocompletedata`
--

INSERT INTO `autocompletedata` (`no`, `consonant`, `searchWord`) VALUES
(1, 'ㅁ미ㅂ버ㅅ', '민법'),
(2, 'ㅁ미ㅂ버ㅅ', '민사소송법의 공시송달규정에 의하여 의사표시를 송달할 수 있다'),
(3, 'ㅁ미ㅂ버ㅅ', '민법 제104조'),
(4, 'ㅁ미ㅂ버ㅅ', '민법상의 전형계약'),
(5, 'ㅁ미ㅂ버ㅅ', '민법상 물권에 관한 설명'),
(6, 'ㅁ미ㅂ버ㅅ', '민법상 공유에 관한 설명'),
(7, 'ㅁ미ㅂ버ㅅ', '민사소송의 승소 대가로 성공보수를 받기로 한 약정'),
(8, 'ㅁ미ㅂ버ㅅ', '민사집행법상 경매의 매수인은 등기를 하여야 소유권을 취득할 수 있다'),
(9, 'ㅁ미ㅂ버ㅅ', '민법 규정은 임대차에도 적용된다'),
(10, 'ㅁ미ㅂ버ㅅ', '민법상 해제의 효과에 따른 제3자 보호규정이 적용된다');