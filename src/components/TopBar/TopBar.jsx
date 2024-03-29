import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { parse, stringify } from 'qs';
import { useQuery } from '@apollo/client';
import { useChain, useTransition } from 'react-spring';
import Icon from '@mdi/react';
import {
  mdiAccountCircleOutline,
  mdiClose,
  mdiEmailOutline,
  mdiFacebook,
  mdiInformationOutline,
  mdiInstagram,
  mdiMenu,
  mdiPostOutline,
  mdiStoreOutline,
  // mdiThemeLightDark,
} from '@mdi/js';

import { useTheme } from '@contexts';
import { BasketIcon } from '@components/BasketIcon';

import { GET_SETTINGS } from './TopBar.gql';
import * as Styled from './TopBar.styled';

const Logo = () => (
  <Styled.SVG
    viewBox="0 0 3059 1040"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlSpace="preserve"
    xmlnsSerif="http://www.serif.com/"
  >
    <g transform="matrix(4.16667,0,0,4.16667,-7521,-552)">
      <Styled.Path d="M1891.07,135.589L1885,136.299L1879.1,137.844L1873,138.38L1867.07,139.799L1861,140.469L1855.03,141.675L1849.05,142.841L1843.13,144.268L1837.33,146.309L1831.39,147.688L1825.32,148.382L1819.46,150.171L1813.4,150.888L1809.06,153.182L1805.72,156.942L1805.78,162.081L1806.33,168.064L1807.95,173.825L1810.03,179.493L1810.03,185.578L1811.09,191.458L1812.73,197.212L1813.51,203.147L1815.81,208.775L1816.66,214.695L1817.4,220.63L1818.76,226.447L1820.47,232.185L1820.63,238.239L1822.77,243.898L1823.46,249.849L1824.77,255.674L1825.62,261.585L1827.18,267.363L1827.82,273.322L1830.09,278.95L1831.03,284.853L1831.79,290.788L1832.94,296.653L1833.59,302.604L1835.06,308.397L1837.16,314.073L1838.27,319.937L1839.26,325.832L1839.99,331.776L1841.2,337.616L1842.65,343.418L1843.07,349.424L1844.83,355.162L1845.62,361.097L1847.13,366.89L1847.7,372.873L1850.08,377.65L1854.54,380.519L1859.72,380.322L1865.54,378.407L1871.7,378.131L1877.69,377.043L1883.64,375.75L1889.47,373.811L1895.61,373.519L1901.57,372.242L1907.33,370.043L1913.43,369.445L1919.39,368.215L1925.33,366.851L1931.45,366.363L1937.22,364.156L1942.82,363.138L1948.48,362.137L1953.78,359.954L1958.65,356.935L1963.87,354.65L1968.74,351.694L1972.98,347.887L1977.52,344.411L1981.54,340.312L1984.27,335.244L1988.06,330.16L1989.96,324.091L1991.97,318.163L1994.49,312.291L1995.5,306.009L1994.7,299.648L1994.79,293.366L1994.09,287.116L1993.47,280.818L1991.8,275.718L1991.03,269.846L1988.86,264.344L1986.4,258.952L1982.81,254.239L1978.97,249.794L1974.98,245.466L1970.27,241.951L1966.35,237.797L1968.78,232.926L1971.68,227.991L1973.53,222.576L1975.05,217.091L1975.79,211.471L1976.86,205.882L1976.99,200.168L1976.11,194.516L1975.17,191.198L1974.44,185.499L1971.86,180.313L1970.68,174.677L1967.7,169.766L1965.91,164.233L1962.44,159.646L1959.04,155.027L1955.23,150.707L1950.39,147.539L1945.99,143.905L1940.92,141.233L1935.7,138.971L1930.4,136.961L1924.9,135.558L1919.35,134.328L1913.71,133.587L1908,132.965L1902.32,133.808L1896.59,134.005L1891.07,135.589ZM1909.13,224.555L1903.13,225.249L1897.31,226.778L1891.29,227.298L1885.44,228.701L1879.43,229.355L1873.98,230.64L1873.11,225.217L1871.72,219.471L1869.71,213.851L1868.37,208.089L1867.71,202.194L1865.96,196.511L1865.3,190.473L1871.27,188.936L1877.3,188.47L1883.14,187.036L1889.17,186.484L1894.98,184.845L1900.69,182.756L1908.15,183.891L1914.73,186.855L1920.3,191.584L1922.71,198.457L1924.48,201.437L1924.19,209.019L1920.84,215.68L1915.86,221.126L1909.13,224.555ZM1882.95,279.265L1889.31,278.311L1895.13,276.782L1901.16,276.27L1907.01,274.859L1913.02,274.205L1918.91,273.007L1923.76,272.62L1928.57,273.251L1933.43,274.678L1939,279.919L1941.3,287.139L1943.21,293.595L1943.15,298.734L1942.47,303.786L1939.56,307.956L1934.54,313.387L1927.5,315.523L1921.7,317.154L1915.98,319.243L1909.86,319.259L1903.94,320.323L1898.13,321.971L1892.6,322.853L1890.45,317.194L1889.52,310.872L1888.7,304.535L1887.26,298.316L1885.47,292.168L1885.22,285.689L1882.95,279.265Z" />
      <Styled.Path d="M2264.85,155.818L2258.48,154.833L2252.08,154.029L2245.64,153.525L2239.38,151.822L2232.97,151.096L2226.52,150.569L2221.49,151.033L2217.57,154.202L2217.45,154.604L2213.96,159.428L2210.44,164.244L2206.63,168.855L2203.57,173.97L2200.67,179.204L2197.47,184.225L2193.2,188.521L2190.05,193.589L2187.12,198.792L2183.46,203.505L2180.42,208.652L2176.87,214.107L2175.1,207.848L2173.31,202.157L2171.99,196.324L2170.38,190.578L2167.9,185.108L2165.8,179.52L2164.42,173.703L2162.78,167.972L2161.12,162.242L2159.1,156.63L2157.84,150.758L2155.81,145.138L2154.67,145.154L2152.2,141.015L2147.82,138.635L2142.36,137.429L2136.77,137.106L2131.34,135.75L2125.63,136.279L2120.22,134.749L2114.74,133.685L2109.1,133.693L2104.18,133.567L2099.89,136.011L2097.83,140.558L2097.95,145.161L2099.48,149.505L2101.66,155.196L2104.15,160.776L2105.21,166.869L2108.45,172.181L2110.48,177.935L2112.47,183.697L2113.51,189.798L2115.4,195.592L2118,201.14L2120.76,206.626L2122.28,212.562L2124.06,218.387L2126.25,224.085L2128.32,229.816L2130.62,235.467L2132.73,241.19L2134.16,247.148L2136.01,252.966L2138.78,258.459L2140.78,264.229L2141.64,270.976L2140.68,276.706L2139.68,282.429L2138.16,288.088L2137.76,293.897L2136.55,299.596L2136.16,305.413L2136.06,311.278L2134.62,316.937L2133.76,322.683L2133.04,328.452L2131.93,334.167L2131.18,339.929L2130.55,345.722L2129.18,351.389L2129.22,357.285L2128.41,363.047L2127.89,368.163L2131.64,371.607L2136.18,373.278L2141.61,374.665L2147.03,376.226L2152.74,375.864L2158.28,376.55L2163.8,377.448L2169.19,379.245L2174.46,378.906L2178.07,375.217L2180.15,370.709L2181.32,364.639L2181.8,358.46L2183.01,352.399L2183.93,346.29L2184.71,340.165L2185.32,334.002L2186.15,327.885L2187.2,321.8L2187.96,315.668L2189.45,309.646L2189.78,303.443L2190.75,297.342L2191.61,291.225L2193.42,285.235L2193.21,278.961L2196.17,272.284L2200.41,267.855L2203.41,262.503L2207.25,257.774L2210.76,252.792L2214.49,247.984L2217.88,242.924L2221.42,237.966L2225.51,233.418L2229.15,228.531L2232.88,223.715L2236.77,219.033L2240.42,214.154L2243.37,208.755L2247.03,203.891L2251.21,199.414L2254.06,193.936L2258.35,189.538L2261.93,184.612L2265.29,179.52L2269.08,174.735L2271.46,170.699L2273.36,166.561L2272.55,161.769L2269.86,157.387L2264.85,155.818Z" />
      <Styled.Path d="M2507.26,151.627L2502.97,146.827L2497.22,144.076L2491.39,141.664L2485.83,138.472L2479.4,138.062L2473.37,136.013L2467.05,135.524L2460.73,135.256L2454.47,136.391L2448.76,136.864L2442.97,136.225L2437.31,137.581L2431.08,138.228L2424.66,138.038L2418.51,139.638L2412.8,142.46L2406.71,144.241L2401.55,147.946L2396.04,151.02L2391.71,155.616L2386.34,159.162L2382.64,164.073L2379.65,169.433L2377.21,174.998L2374.21,180.326L2373.09,186.34L2370.8,192.086L2370.85,198.242L2370.18,204.311L2370.12,210.436L2371.53,216.49L2371,222.661L2372.32,228.715L2371.84,234.886L2373.25,240.932L2372.67,247.119L2373.39,253.212L2373.43,259.352L2374.3,265.429L2374.13,271.586L2374.72,277.694L2376.22,283.724L2376.08,289.88L2376.94,295.965L2376.93,302.113L2376.83,308.269L2377.45,314.369L2378.58,320.376L2379.97,326.28L2380.78,332.349L2382.7,338.15L2385.38,343.652L2388.87,348.665L2392.85,353.237L2396.42,358.171L2401.03,362.128L2406.19,365.69L2411.36,369.269L2417,372.043L2422.92,374.187L2429.01,375.708L2435.1,377.498L2441.46,377.238L2447.73,378.262L2454.06,378.057L2459.72,376.883L2465.44,376.56L2471.18,376.355L2477.38,375.22L2483.61,374.424L2489.8,373.281L2495.56,370.711L2501.8,369.277L2507.11,365.816L2512.37,362.348L2517.06,358.155L2521.96,354.127L2525.11,348.854L2528.36,343.77L2531.18,338.466L2534.86,333.413L2535.43,327.21L2537.76,321.487L2537.24,315.3L2537.98,309.27L2537.66,303.217L2537.07,297.116L2537.5,290.944L2537.27,284.82L2535.72,278.782L2535.93,272.626L2535.58,266.51L2535.25,260.385L2535,254.261L2534.73,248.136L2533.01,242.114L2533.37,235.943L2532.88,229.834L2532.05,223.749L2531.93,217.616L2530.91,211.539L2531.32,205.367L2531.06,199.235L2530.59,193.127L2528.64,187.286L2526.96,181.469L2525.25,175.644L2522.74,170.103L2520.07,164.601L2515.91,160.085L2511.75,155.678L2507.26,151.627ZM2422.36,206.802L2423.84,201.9L2424.83,197.052L2427.37,192.67L2431.73,190.069L2435.59,186.632L2440.73,186.569L2446.43,186.025L2452.16,185.725L2457.81,184.441L2465.46,185.213L2471.41,189.887L2475.48,193.079L2477.72,197.777L2477.43,202.971L2477.95,209.072L2479.29,215.118L2478.97,221.282L2480.2,227.335L2480.11,233.491L2481.31,239.553L2480.43,245.756L2481.1,251.848L2482.03,257.934L2482.96,264.003L2482.65,270.182L2483.78,276.244L2483.13,282.431L2484.33,288.492L2484.32,294.633L2484.46,300.773L2485.88,306.819L2484.72,311.808L2484.05,316.868L2480.53,320.581L2475.23,325.933L2467.73,326.808L2462.03,327.501L2456.29,327.509L2450.6,328.353L2445.72,327.493L2441.08,326.067L2436.32,324.12L2432,317.901L2429.6,310.744L2429.62,304.596L2429.72,298.448L2429.1,292.355L2428.19,286.27L2427.43,280.185L2427.77,274.013L2427.51,267.888L2426.99,261.78L2426.12,255.695L2425.19,249.626L2425.41,243.462L2424.78,237.369L2424.06,231.276L2423.98,225.128L2423.58,219.012L2423.1,212.903L2422.36,206.802Z" />
    </g>
  </Styled.SVG>
);

export const TopBar = () => {
  const { pathname, search } = useLocation();

  const { 'menu-visible': menuVisible, ...restQuery } = parse(search, {
    ignoreQueryPrefix: true,
  });

  const {
    isDesktop,
    // toggleTheme,
  } = useTheme();

  const {
    data: { allSettings: [{ facebookUrl, instagramUrl } = {}] = [] } = {},
  } = useQuery(GET_SETTINGS);

  const menuItemsLeft = [
    {
      key: 'shop',
      icon: mdiStoreOutline,
      title: 'Shop',
      to: '/products',
    },
    {
      key: 'blog',
      icon: mdiPostOutline,
      title: 'Blog',
      to: '/blog',
    },
    {
      key: 'about',
      icon: mdiInformationOutline,
      title: 'About',
      to: '/about',
    },
    {
      key: 'contact',
      icon: mdiEmailOutline,
      title: 'Contact',
      to: '/contact',
    },
  ];

  const menuItemsRight = [
    // {
    //   as: 'button',
    //   key: 'themeToggle',
    //   icon: mdiThemeLightDark,
    //   onClick: toggleTheme,
    //   title: 'Switch theme',
    // },
    {
      as: 'a',
      key: 'facebook',
      href: facebookUrl,
      target: '_blank',
      icon: mdiFacebook,
      title: 'Facebook',
    },
    {
      as: 'a',
      key: 'instagram',
      href: instagramUrl,
      target: '_blank',
      icon: mdiInstagram,
      title: 'Instagram',
    },
    {
      key: 'basket',
      title: 'Basket',
      to: '/basket',
      component: <BasketIcon />,
    },
    {
      key: 'account',
      to: '/account',
      icon: mdiAccountCircleOutline,
      title: 'Account',
    },
  ];

  const menuRef = useRef();
  const menuTransitions = useTransition(menuVisible, null, {
    ref: menuRef,
    config: { duration: 500 },
    from: {
      backdropFilter: 'blur(0px)',
      WebkitBackdropFilter: 'blur(0px)',
      opacity: 0,
    },
    enter: {
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      opacity: 1,
    },
    leave: {
      backdropFilter: 'blur(0px)',
      WebkitBackdropFilter: 'blur(0px)',
      opacity: 0,
    },
  });

  const menuItemsRef = useRef();
  const menuItemsTransitions = useTransition(
    menuVisible ? [...menuItemsLeft, ...menuItemsRight] : [],
    item => item.key,
    {
      ref: menuItemsRef,
      unique: true,
      trail: menuVisible ? 50 : 0,
      from: {
        opacity: 0,
      },
      enter: {
        opacity: 1,
      },
      leave: {
        opacity: 0,
      },
    },
  );

  useChain(
    menuVisible ? [menuRef, menuItemsRef] : [menuItemsRef, menuRef],
    menuVisible ? [0, 0.5] : [0, 0],
  );

  return (
    <>
      <Styled.Wrapper>
        <Styled.TopBar className="TopBar">
          <Styled.Group>
            <Styled.Link to="/">
              <Logo />
            </Styled.Link>

            {isDesktop ? (
              <Styled.Nav>
                <Styled.NavItems>
                  {menuItemsLeft.map(({ key, title, to }) => (
                    <Styled.NavItem key={key}>
                      <Styled.Link selected={pathname.includes(to)} to={to}>
                        {title.toLowerCase()}
                      </Styled.Link>
                    </Styled.NavItem>
                  ))}
                </Styled.NavItems>
              </Styled.Nav>
            ) : null}
          </Styled.Group>

          <Styled.Nav>
            <Styled.NavItems>
              {isDesktop ? (
                <>
                  {menuItemsRight.map(
                    ({
                      as,
                      component,
                      href,
                      icon,
                      key,
                      onClick,
                      target,
                      title,
                      to,
                    }) => (
                      <Styled.NavItem key={key}>
                        <Styled.LinkIcon
                          as={as}
                          href={href}
                          onClick={onClick}
                          selected={pathname.includes(to)}
                          target={target}
                          to={to}
                        >
                          {component || (
                            <Icon path={icon} size={1} title={title} />
                          )}
                        </Styled.LinkIcon>
                      </Styled.NavItem>
                    ),
                  )}
                  {/* {isAuthenticated ? null : (
                    <Styled.NavItem>
                      <Styled.LinkIcon>
                        <Button borderRadius onClick={openLoginModal}>
                          Log in
                        </Button>
                      </Styled.LinkIcon>
                    </Styled.NavItem>
                  )} */}
                </>
              ) : (
                <Styled.NavItem>
                  <Styled.LinkIcon
                    to={({ pathname }) => ({
                      pathname,
                      search: stringify(
                        { ...restQuery, 'menu-visible': true },
                        { arrayFormat: 'brackets', encode: false },
                      ),
                    })}
                  >
                    {menuVisible ? (
                      <Icon path={mdiClose} size={1} title="CloseMenu" />
                    ) : (
                      <Icon path={mdiMenu} size={1} title="OpenMenu" />
                    )}
                  </Styled.LinkIcon>
                </Styled.NavItem>
              )}
            </Styled.NavItems>
          </Styled.Nav>
        </Styled.TopBar>
      </Styled.Wrapper>

      {menuTransitions.map(
        ({ item: menuItem, props: menuProps }) =>
          menuItem && (
            <Styled.Menu style={menuProps}>
              {menuItemsTransitions.map(
                ({
                  item: menuItemsItem,
                  item: {
                    as,
                    component,
                    href,
                    onClick,
                    target,
                    icon,
                    title,
                    to,
                  },
                  key,
                  props,
                }) =>
                  menuItemsItem && (
                    <Styled.Link
                      as={as}
                      href={href}
                      onClick={onClick}
                      target={target}
                      to={to}
                    >
                      <Styled.MenuItem key={key} style={props}>
                        <span>{title}</span>
                        {component || (
                          <Icon path={icon} size={1} title={title} />
                        )}
                      </Styled.MenuItem>
                    </Styled.Link>
                  ),
              )}
            </Styled.Menu>
          ),
      )}
    </>
  );
};
