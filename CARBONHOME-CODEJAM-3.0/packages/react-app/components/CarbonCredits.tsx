import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import Router from 'next/router';
import ToucanClient from 'toucan-sdk';

export default function CarbonCredits() {
  const [images, setImages] = useState<any[]>([]);
  const [tokens, setTokens] = useState<any[]>([]);

  const CARBON_OFFSETS = gql`
    query CarbonOffsets {
      tco2Tokens {
        id
        symbol
        name
        createdAt
        address
        creationTx
        score
        projectVintage {
          creator {
            id
          }
          endTime
          id
          isCCPcompliant
          isCorsiaCompliant
          name
          startTime
          timestamp
          totalVintageQuantity
          tx
          owner {
            id
          }
        }
      }
    }
  `;



  const fetchTC02Tokens = async () => {
    const toucan = new ToucanClient('alfajores');
    const tokens = await toucan.fetchAllTCO2Tokens();
    setTokens(tokens);
    console.log(tokens);
  };

  const getImages = useCallback(async () => {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_IMAGE_KEY}&q=nature&image_type=photo&per_page=200`
    );
    setImages(response.data.hits);
    console.log(images.length);
  }, [images.length]);

  useEffect(() => {
    getImages();
    fetchTC02Tokens();
  }, [getImages]);

  const { loading, error, data } = useQuery(CARBON_OFFSETS);

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='text-3xl pb-10 text-center font-bold font-display text-gray-900'>
          Discover Carbon Credits to offset your carbon footprint
        </h2>

        <div>
          {loading ? (
            <div className='text-center'>Loading</div>
          ) : error ? (
            <div>Error occured</div>
          ) :  (
            <div className='mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
              {data &&
                data.tco2Tokens.map((item: any, index: number) => (
                  <div key={index}>
                    <div className='relative'>
                      <div className='relative h-72 w-full overflow-hidden rounded-lg'>
                        {images && (
                          <Image
                            className='h-full w-full object-cover object-center'
                            key={index}
                            src={
                              images[index]?.webformatURL &&
                              images[index]?.webformatURL
                            }
                            alt='images'
                            height={100}
                            width={200}
                          />
                        )}
                      </div>
                      <div className='relative mt-4'>
                        <h3 className='text-sm font-medium text-gray-900'>
                          {item.name}
                        </h3>
                      </div>
                    </div>
                    <div className='mt-6'>
                      <button
                        onClick={() =>
                          Router.push({
                            pathname: `/TCO2Token/${item.address}`,
                            query: {
                              id: item.id,
                              symbol: item.symbol,
                              name: item.name,
                              image: images[index].webformatURL,
                              tokenAddress: item.address,
                              createdAt: item.createdAt,
                              creationTx: item.creationTx,
                              score: item.score,
                              projectVintageCreatorId:
                                item.projectVintage.creator.id,
                              startTime: item.projectVintage.startTime,
                              endTime: item.projectVintage.endTime,
                              projectVintageId: item.projectVintage.id,
                              isCCPcompliant:
                                item.projectVintage.isCCPcompliant,
                              isCorsiaCompliant:
                                item.projectVintage.isCorsiaCompliant,
                              vintageName: item.projectVintage.name,
                              totalVintageQuantity:
                                item.projectVintage.totalVintageQuantity,
                              tx: item.projectVintage.tx,
                              owner: item.projectVintage.owner.id,
                            },
                          })
                        }
                        data-te-toggle='modal'
                        data-te-target='#redeemModal'
                        data-te-ripple-init
                        data-te-ripple-color='light'
                        className='relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200'
                      >
                        View Details
                        <span className='sr-only'>, {item.name}</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
