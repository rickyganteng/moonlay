import React, { Component } from 'react';
import NavBar from '../Components/Navbar/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';

class StarShip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataApiStarShip: [],
      dataPage: '',
      dataBack: '',
    };
  }

  componentDidMount() {
    this.getDataLimit();
  }

  getDataLimit = () => {
    axios
      .get(`https://swapi.dev/api/starships/`)
      .then((res) => {
        this.setState({
          dataApiStarShip: res.data.results,
          dataPage: res.data.next,
          dataBack: res.data.previous,
        });
      })
      .catch((err) => {
        return [];
      });
  };

  getDataNext = (next) => {
    axios
      .get(`${next}`)
      .then((res) => {
        this.setState({
          dataApiStarShip: res.data.results,
          dataPage: res.data.next,
          dataBack: res.data.previous,
        });
      })
      .catch((err) => {
        return [];
      });
  };
  getDataBack = (back) => {
    axios
      .get(`${back}`)
      .then((res) => {
        this.setState({
          dataApiStarShip: res.data.results,
          dataPage: res.data.next,
          dataBack: res.data.previous,
        });
      })
      .catch((err) => {
        return [];
      });
  };

  DetailsFilms = (event) => {
    axios
      .get(`${event}`)
      .then((res) => {
        Swal.fire({
          title: `${res.data.title}`,
          html:
            `Director : ${res.data.director}</br> ` +
            `producer : ${res.data.producer} `,
        });
      })
      .catch((err) => {
        return [];
      });
  };

  Delete = (event) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  };

  render() {
    const th = [
      'id',
      'name',
      'model',
      'cargo capacity',
      'cost in credits',
      'film',
      'crew',
      'starship class',
      'manufacture',
      'action',
    ];
    return (
      <>
        <NavBar />
        <h1 className='text-4xl font-bold tracking-tight sm:text-center sm:text-6xl mb-8 mt-4 uppercase'>
          starship
        </h1>
        <div className='flex flex-col'>
          <div className='overflow-x-auto'>
            <div className='p-1.5 w-full inline-block align-middle'>
              <div
                className='overflow-hidden border rounded-lg'
                style={{ overflowX: 'auto' }}
              >
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      {th.map((item, index) => (
                        <th
                          scope='col'
                          className='px-3 py-3 text-xs font-bold text-center text-gray-500 uppercase '
                        >
                          {item}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200'>
                    {this.state.dataApiStarShip.map((planets, index) => (
                      <tr>
                        <td className='px-3 py-2 text-sm text-center font-medium text-gray-800 '>
                          {index + 1}
                        </td>
                        <td className='px-3 py-2 text-sm text-gray-800 text-center '>
                          {planets.name}
                        </td>
                        <td className='px-3 py-2 text-sm text-gray-800 text-center '>
                          {planets.model}
                        </td>
                        <td className='px-3 py-2 text-sm text-gray-800 text-center '>
                          {planets.cargo_capacity}
                        </td>
                        <td className='px-3 py-2 text-sm text-gray-800 text-center '>
                          {planets.cost_in_credits}
                        </td>
                        <td className='text-sm text-gray-800 text-center'>
                          {planets.films.map((planets, index) => (
                            <p
                              className='mr-2 mb-2 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                              onClick={() => this.DetailsFilms(planets)}
                            >
                              Film {index + 1}
                            </p>
                          ))}
                        </td>
                        <td className='px-3 py-2 text-sm text-gray-800 text-center '>
                          {planets.crew}
                        </td>
                        <td className='px-3 py-2 text-sm text-gray-800 text-center '>
                          {planets.starship_class}
                        </td>
                        <td className='px-3 py-2 text-sm text-gray-800 text-center '>
                          {planets.manufacturer}
                        </td>
                        <td className='px-3 py-2 text-sm text-gray-800 text-center '>
                          <tr>
                            <td>
                              <button
                                type='button'
                                className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900'
                              >
                                Update
                              </button>
                            </td>
                            <td>
                              <button
                                type='button'
                                className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                                onClick={() => this.Delete()}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className='flex justify-center items-center mt-5'>
                <button
                  type='button'
                  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                  onClick={() => this.getDataBack(this.state.dataBack)}
                >
                  Previous
                </button>
                <button
                  type='button'
                  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                  onClick={() => this.getDataNext(this.state.dataPage)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default StarShip;
